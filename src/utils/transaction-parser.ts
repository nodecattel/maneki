import { ParsedTransaction, TransactionType } from '../types/helius-types.js';
import { KNOWN_PROGRAMS, PROTOCOL_SOURCES } from './config.js';

export class TransactionParser {
    parse(rawTransaction: any): ParsedTransaction {
        try {
            const {
                accountData,
                description,
                events,
                fee,
                signature,
                slot,
                source,
                timestamp,
                tokenTransfers,
                type,
                nativeTransfers
            } = rawTransaction;

            // Identify protocol if applicable
            let protocol = source;
            if (type === TransactionType.SWAP) {
                protocol = this.identifyProtocol(rawTransaction);
            }

            return {
                accountData: this.parseAccountData(accountData),
                description,
                events,
                fee,
                feePayer: rawTransaction.feePayer,
                signature,
                slot,
                source: protocol,
                timestamp,
                tokenTransfers: this.parseTokenTransfers(tokenTransfers),
                nativeTransfers,
                type
            };
        } catch (error) {
            console.error('Error parsing transaction:', error);
            throw error;
        }
    }

    private parseAccountData(accountData: any[]): any[] {
        if (!accountData) return [];
        
        return accountData.map(account => ({
            account: account.account,
            nativeBalanceChange: account.nativeBalanceChange,
            tokenBalanceChanges: account.tokenBalanceChanges || []
        }));
    }

    private parseTokenTransfers(transfers: any[]): any[] {
        if (!transfers) return [];
        
        return transfers.map(transfer => ({
            fromTokenAccount: transfer.fromTokenAccount,
            fromUserAccount: transfer.fromUserAccount,
            toTokenAccount: transfer.toTokenAccount,
            toUserAccount: transfer.toUserAccount,
            mint: transfer.mint,
            tokenAmount: transfer.tokenAmount,
            tokenStandard: transfer.tokenStandard
        }));
    }

    private identifyProtocol(transaction: any): string {
        // Check instructions for known program IDs
        for (const ix of transaction.instructions || []) {
            // Jupiter protocols
            if (ix.programId === KNOWN_PROGRAMS.JUPITER_V1) return PROTOCOL_SOURCES.JUPITER;
            if (ix.programId === KNOWN_PROGRAMS.JUPITER_V2) return PROTOCOL_SOURCES.JUPITER;
            if (ix.programId === KNOWN_PROGRAMS.JUPITER_V3) return PROTOCOL_SOURCES.JUPITER;
            if (ix.programId === KNOWN_PROGRAMS.JUPITER_V4) return PROTOCOL_SOURCES.JUPITER;

            // Raydium protocols
            if (ix.programId === KNOWN_PROGRAMS.RAYDIUM_LIQUIDITY_POOL_V2) return PROTOCOL_SOURCES.RAYDIUM;
            if (ix.programId === KNOWN_PROGRAMS.RAYDIUM_LIQUIDITY_POOL_V3) return PROTOCOL_SOURCES.RAYDIUM;
            if (ix.programId === KNOWN_PROGRAMS.RAYDIUM_LIQUIDITY_POOL_V4) return PROTOCOL_SOURCES.RAYDIUM;

            // Orca protocols
            if (ix.programId === KNOWN_PROGRAMS.ORCA_TOKEN_SWAP_V1) return PROTOCOL_SOURCES.ORCA;
            if (ix.programId === KNOWN_PROGRAMS.ORCA_TOKEN_SWAP_V2) return PROTOCOL_SOURCES.ORCA;
            if (ix.programId === KNOWN_PROGRAMS.ORCA_WHIRLPOOLS) return PROTOCOL_SOURCES.ORCA;

            // Openbook/Serum protocols
            if (ix.programId === KNOWN_PROGRAMS.SERUM_DEX_V1) return PROTOCOL_SOURCES.SERUM;
            if (ix.programId === KNOWN_PROGRAMS.SERUM_DEX_V2) return PROTOCOL_SOURCES.SERUM;
            if (ix.programId === KNOWN_PROGRAMS.SERUM_DEX_V3) return PROTOCOL_SOURCES.SERUM;
            if (ix.programId === KNOWN_PROGRAMS.SERUM_SWAP) return PROTOCOL_SOURCES.SERUM;

            // Aldrin protocols
            if (ix.programId === KNOWN_PROGRAMS.ALDRIN_AMM_V1) return PROTOCOL_SOURCES.ALDRIN;
            if (ix.programId === KNOWN_PROGRAMS.ALDRIN_AMM_V2) return PROTOCOL_SOURCES.ALDRIN;

            // Other DEX protocols
            if (ix.programId === KNOWN_PROGRAMS.CREMA) return PROTOCOL_SOURCES.CREMA;
            if (ix.programId === KNOWN_PROGRAMS.LIFINITY) return PROTOCOL_SOURCES.LIFINITY;
            if (ix.programId === KNOWN_PROGRAMS.LIFINITY_V2) return PROTOCOL_SOURCES.LIFINITY;
            if (ix.programId === KNOWN_PROGRAMS.CYKURA) return PROTOCOL_SOURCES.CYKURA;
            if (ix.programId === KNOWN_PROGRAMS.STEP_FINANCE) return PROTOCOL_SOURCES.STEP_FINANCE;
            if (ix.programId === KNOWN_PROGRAMS.CROPPER) return PROTOCOL_SOURCES.CROPPER;
            if (ix.programId === KNOWN_PROGRAMS.SAROS_AMM) return PROTOCOL_SOURCES.SAROS;
            if (ix.programId === KNOWN_PROGRAMS.SENCHA_EXCHANGE) return PROTOCOL_SOURCES.SENCHA;
            if (ix.programId === KNOWN_PROGRAMS.SABER_STABLE_SWAP) return PROTOCOL_SOURCES.SABER;
            if (ix.programId === KNOWN_PROGRAMS.SABER_EXCHANGE) return PROTOCOL_SOURCES.SABER;
            if (ix.programId === KNOWN_PROGRAMS.MERCURIAL_STABLE_SWAP) return PROTOCOL_SOURCES.MERCURIAL;
            if (ix.programId === KNOWN_PROGRAMS.FOXY_SWAP) return PROTOCOL_SOURCES.FOXY;
            if (ix.programId === KNOWN_PROGRAMS.HADE_SWAP) return PROTOCOL_SOURCES.HADESWAP;
            if (ix.programId === KNOWN_PROGRAMS.ZETA) return PROTOCOL_SOURCES.ZETA;
            if (ix.programId === KNOWN_PROGRAMS.MARINADE) return PROTOCOL_SOURCES.MARINADE;
        }

        // Check inner instructions for program identification
        const innerSwaps = transaction.events?.swap?.innerSwaps || [];
        for (const swap of innerSwaps) {
            if (swap.programInfo?.source) {
                // Return the original source if found in inner swaps
                return swap.programInfo.source;
            }
        }

        // Return default source if no specific protocol is identified
        return transaction.source;
    }
}
