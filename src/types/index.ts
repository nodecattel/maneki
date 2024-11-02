import { TransactionType, WebhookType } from 'helius-sdk';

// Re-export from helius-sdk
export { TransactionType, WebhookType };

export interface TokenInfo {
    address: string;
    symbol: string;
    name?: string;
    decimals: number;
}

export interface WalletInfo {
    address: string;
    label: string;
}

export interface WebhookConfig {
    webhookId: string;
    accountAddresses: string[];
    transactionTypes: TransactionType[];
    webhookType: WebhookType;
    authHeader: string;
}

export interface ParsedTransaction {
    accountData: {
        account: string;
        nativeBalanceChange: number;
        tokenBalanceChanges: Array<{
            mint: string;
            amount: number;
            decimals: number;
        }>;
    }[];
    description: string;
    events?: {
        nft?: {
            amount?: string;
            buyer?: string;
            seller?: string;
            nfts?: Array<{
                mint: string;
                name?: string;
            }>;
        };
        swap?: {
            nativeInput?: string;
            nativeOutput?: string;
            tokenInputs?: Array<{
                mint: string;
                amount: number;
            }>;
            tokenOutputs?: Array<{
                mint: string;
                amount: number;
            }>;
        };
    };
    fee: number;
    feePayer: string;
    signature: string;
    slot: number;
    source: string;
    timestamp: number;
    tokenTransfers: Array<{
        fromTokenAccount: string;
        fromUserAccount: string;
        toTokenAccount: string;
        toUserAccount: string;
        mint: string;
        tokenAmount: number;
        tokenStandard: string;
    }>;
    nativeTransfers: Array<{
        fromUserAccount: string;
        toUserAccount: string;
        amount: number;
    }>;
    type: TransactionType;
}
