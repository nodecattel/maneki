import { ParsedTransaction } from '../types/index.js';
import { WalletManager } from './wallet-manager.js';

export class TransactionFormatter {
    async format(tx: ParsedTransaction, walletManager: WalletManager): Promise<string> {
        try {
            let output = '\n🔷 Transaction Details 🔷\n';
            output += `⏰ Time: ${new Date(tx.timestamp * 1000).toISOString()}\n`;
            output += `📝 Type: ${tx.type}\n`;
            output += `💰 Fee: ${(tx.fee / 1e9).toFixed(6)} SOL\n`;

            const feePayer = walletManager.getLabelForAddress(tx.feePayer) || tx.feePayer;
            output += `👤 Fee Payer: ${feePayer}\n`;

            // Format based on transaction type
            switch (tx.type) {
                case 'TRANSFER':
                    output += this.formatTransferTransaction(tx, walletManager);
                    break;
                case 'NFT_SALE':
                    output += this.formatNFTSaleTransaction(tx, walletManager);
                    break;
                case 'SWAP':
                    output += this.formatSwapTransaction(tx, walletManager);
                    break;
                case 'NFT_LISTING':
                case 'NFT_BID':
                case 'NFT_CANCEL_LISTING':
                case 'NFT_BID_CANCELLED':
                    output += this.formatNFTMarketTransaction(tx, walletManager);
                    break;
                default:
                    output += this.formatGenericTransaction(tx, walletManager);
            }

            output += `\n🔍 Signature: ${tx.signature}`;
            if (tx.source) {
                output += `\n📍 Source: ${tx.source}`;
            }
            output += '\n═══════════════════════════════\n';

            return output;
        } catch (error) {
            console.error('❌ Error formatting transaction:', error);
            return `⚠️ Error formatting transaction: ${tx.signature}\n${error}`;
        }
    }

    private formatTransferTransaction(tx: ParsedTransaction, walletManager: WalletManager): string {
        let message = `\n📤 Transfer Details: ${tx.description}\n`;
        
        if (tx.nativeTransfers?.length > 0) {
            message += '\n💎 SOL Transfers:\n';
            tx.nativeTransfers.forEach(transfer => {
                const fromLabel = walletManager.getLabelForAddress(transfer.fromUserAccount) || transfer.fromUserAccount;
                const toLabel = walletManager.getLabelForAddress(transfer.toUserAccount) || transfer.toUserAccount;
                const amount = (transfer.amount / 1e9).toFixed(6);
                message += `   ${amount} SOL: ${fromLabel} ➜ ${toLabel}\n`;
            });
        }

        if (tx.tokenTransfers?.length > 0) {
            message += '\n🪙 Token Transfers:\n';
            tx.tokenTransfers.forEach(transfer => {
                const fromLabel = walletManager.getLabelForAddress(transfer.fromUserAccount) || transfer.fromUserAccount;
                const toLabel = walletManager.getLabelForAddress(transfer.toUserAccount) || transfer.toUserAccount;
                const mintLabel = walletManager.getLabelForAddress(transfer.mint) || transfer.mint;
                message += `   ${transfer.tokenAmount} tokens (${mintLabel}): ${fromLabel} ➜ ${toLabel}\n`;
            });
        }

        // Account balance changes
        if (tx.accountData?.length > 0) {
            message += '\n💰 Account Changes:\n';
            tx.accountData.forEach(acc => {
                const accountLabel = walletManager.getLabelForAddress(acc.account) || acc.account;
                if (acc.nativeBalanceChange !== 0) {
                    const solChange = (acc.nativeBalanceChange / 1e9).toFixed(6);
                    message += `   ${accountLabel}: ${solChange} SOL\n`;
                }

                if (acc.tokenBalanceChanges.length > 0) {
                    acc.tokenBalanceChanges.forEach(change => {
                        const mintLabel = walletManager.getLabelForAddress(change.mint) || change.mint;
                        message += `   ${accountLabel}: ${change.amount} tokens (${mintLabel})\n`;
                    });
                }
            });
        }

        return message;
    }

    private formatNFTSaleTransaction(tx: ParsedTransaction, walletManager: WalletManager): string {
        let message = `\n🎨 NFT Sale: ${tx.description}\n`;
        
        if (tx.events?.nft) {
            const { amount, buyer, seller, nfts } = tx.events.nft;
            
            if (amount) {
                message += `💰 Price: ${(Number(amount) / 1e9).toFixed(6)} SOL\n`;
            }
            
            if (buyer) {
                const buyerLabel = walletManager.getLabelForAddress(buyer) || buyer;
                message += `🛒 Buyer: ${buyerLabel}\n`;
            }
            
            if (seller) {
                const sellerLabel = walletManager.getLabelForAddress(seller) || seller;
                message += `💁 Seller: ${sellerLabel}\n`;
            }

            if (nfts && nfts.length > 0) {
                message += '🖼️ NFTs:\n';
                nfts.forEach(nft => {
                    message += `   - Mint: ${nft.mint}\n`;
                    if (nft.name) message += `     Name: ${nft.name}\n`;
                });
            }
        }

        return message;
    }

    private formatSwapTransaction(tx: ParsedTransaction, walletManager: WalletManager): string {
        let message = `\n💱 Swap: ${tx.description}\n`;
        
        if (tx.events?.swap) {
            const { nativeInput, nativeOutput, tokenInputs, tokenOutputs } = tx.events.swap;
            
            if (nativeInput) {
                message += `\n💎 SOL Input: ${(Number(nativeInput) / 1e9).toFixed(6)} SOL\n`;
            }
            if (nativeOutput) {
                message += `💎 SOL Output: ${(Number(nativeOutput) / 1e9).toFixed(6)} SOL\n`;
            }

            if (tokenInputs && tokenInputs.length > 0) {
                message += '\n📥 Token Inputs:\n';
                tokenInputs.forEach(token => {
                    const mintLabel = walletManager.getLabelForAddress(token.mint) || token.mint;
                    message += `   ${token.amount} ${mintLabel}\n`;
                });
            }

            if (tokenOutputs && tokenOutputs.length > 0) {
                message += '\n📤 Token Outputs:\n';
                tokenOutputs.forEach(token => {
                    const mintLabel = walletManager.getLabelForAddress(token.mint) || token.mint;
                    message += `   ${token.amount} ${mintLabel}\n`;
                });
            }
        }

        return message;
    }

    private formatNFTMarketTransaction(tx: ParsedTransaction, walletManager: WalletManager): string {
        let message = `\n🎭 NFT Market Activity: ${tx.description}\n`;

        if (tx.events?.nft) {
            const { amount, buyer, seller, nfts } = tx.events.nft;
            
            if (amount) {
                message += `💰 Amount: ${(Number(amount) / 1e9).toFixed(6)} SOL\n`;
            }
            
            if (buyer) {
                const buyerLabel = walletManager.getLabelForAddress(buyer) || buyer;
                message += `🛒 Buyer: ${buyerLabel}\n`;
            }
            
            if (seller) {
                const sellerLabel = walletManager.getLabelForAddress(seller) || seller;
                message += `💁 Seller: ${sellerLabel}\n`;
            }

            if (nfts && nfts.length > 0) {
                message += '🖼️ NFTs:\n';
                nfts.forEach(nft => {
                    message += `   - Mint: ${nft.mint}\n`;
                    if (nft.name) message += `     Name: ${nft.name}\n`;
                });
            }
        }

        return message;
    }

    private formatGenericTransaction(tx: ParsedTransaction, walletManager: WalletManager): string {
        let message = `\n📄 Details: ${tx.description}\n`;

        // Include token transfers if any
        if (tx.tokenTransfers?.length > 0) {
            message += '\n🪙 Token Transfers:\n';
            tx.tokenTransfers.forEach(transfer => {
                const fromLabel = walletManager.getLabelForAddress(transfer.fromUserAccount) || transfer.fromUserAccount;
                const toLabel = walletManager.getLabelForAddress(transfer.toUserAccount) || transfer.toUserAccount;
                const mintLabel = walletManager.getLabelForAddress(transfer.mint) || transfer.mint;
                message += `   ${transfer.tokenAmount} ${mintLabel}: ${fromLabel} ➜ ${toLabel}\n`;
            });
        }

        // Include native transfers if any
        if (tx.nativeTransfers?.length > 0) {
            message += '\n💎 SOL Transfers:\n';
            tx.nativeTransfers.forEach(transfer => {
                const fromLabel = walletManager.getLabelForAddress(transfer.fromUserAccount) || transfer.fromUserAccount;
                const toLabel = walletManager.getLabelForAddress(transfer.toUserAccount) || transfer.toUserAccount;
                const amount = (transfer.amount / 1e9).toFixed(6);
                message += `   ${amount} SOL: ${fromLabel} ➜ ${toLabel}\n`;
            });
        }

        return message;
    }
}

export default TransactionFormatter;
