export enum TransactionType {
    // NFT Related
    UNKNOWN = "UNKNOWN",
    NFT_BID = "NFT_BID",
    NFT_BID_CANCELLED = "NFT_BID_CANCELLED",
    NFT_LISTING = "NFT_LISTING",
    NFT_CANCEL_LISTING = "NFT_CANCEL_LISTING",
    NFT_SALE = "NFT_SALE",
    NFT_MINT = "NFT_MINT",
    NFT_AUCTION_CREATED = "NFT_AUCTION_CREATED",
    NFT_AUCTION_UPDATED = "NFT_AUCTION_UPDATED",
    NFT_AUCTION_CANCELLED = "NFT_AUCTION_CANCELLED",
    NFT_PARTICIPATION_REWARD = "NFT_PARTICIPATION_REWARD",
    NFT_MINT_REJECTED = "NFT_MINT_REJECTED",
    NFT_GLOBAL_BID = "NFT_GLOBAL_BID",
    NFT_GLOBAL_BID_CANCELLED = "NFT_GLOBAL_BID_CANCELLED",
    BURN_NFT = "BURN_NFT",
    NFT_RENT_LISTING = "NFT_RENT_LISTING",
    NFT_RENT_ACTIVATE = "NFT_RENT_ACTIVATE",
    NFT_RENT_CANCEL_LISTING = "NFT_RENT_CANCEL_LISTING",
    NFT_RENT_UPDATE_LISTING = "NFT_RENT_UPDATE_LISTING",

    // Store/Creator Related
    CREATE_STORE = "CREATE_STORE",
    WHITELIST_CREATOR = "WHITELIST_CREATOR",
    ADD_TO_WHITELIST = "ADD_TO_WHITELIST",
    REMOVE_FROM_WHITELIST = "REMOVE_FROM_WHITELIST",
    UPDATE_PRIMARY_SALE_METADATA = "UPDATE_PRIMARY_SALE_METADATA",

    // Token/Transaction Related
    TRANSFER = "TRANSFER",
    BURN = "BURN",
    WITHDRAW = "WITHDRAW",
    DEPOSIT = "DEPOSIT",
    TOKEN_MINT = "TOKEN_MINT",
    INITIALIZE_ACCOUNT = "INITIALIZE_ACCOUNT",

    // Auction/Market Related
    AUCTION_MANAGER_CLAIM_BID = "AUCTION_MANAGER_CLAIM_BID",
    EMPTY_PAYMENT_ACCOUNT = "EMPTY_PAYMENT_ACCOUNT",
    AUCTION_HOUSE_CREATE = "AUCTION_HOUSE_CREATE",
    CLOSE_ESCROW_ACCOUNT = "CLOSE_ESCROW_ACCOUNT",

    // Vault Related
    ADD_TOKEN_TO_VAULT = "ADD_TOKEN_TO_VAULT",
    ACTIVATE_VAULT = "ACTIVATE_VAULT",
    INIT_VAULT = "INIT_VAULT",

    // Bank/Farm Related
    INIT_BANK = "INIT_BANK",
    INIT_STAKE = "INIT_STAKE",
    MERGE_STAKE = "MERGE_STAKE",
    SPLIT_STAKE = "SPLIT_STAKE",
    SET_BANK_FLAGS = "SET_BANK_FLAGS",
    SET_VAULT_LOCK = "SET_VAULT_LOCK",
    UPDATE_VAULT_OWNER = "UPDATE_VAULT_OWNER",
    UPDATE_BANK_MANAGER = "UPDATE_BANK_MANAGER",
    RECORD_RARITY_POINTS = "RECORD_RARITY_POINTS",
    ADD_RARITIES_TO_BANK = "ADD_RARITIES_TO_BANK",
    INIT_FARM = "INIT_FARM",
    INIT_FARMER = "INIT_FARMER",
    REFRESH_FARMER = "REFRESH_FARMER",
    UPDATE_FARM = "UPDATE_FARM",

    // Staking Related
    STAKE_TOKEN = "STAKE_TOKEN",
    UNSTAKE_TOKEN = "UNSTAKE_TOKEN",
    STAKE_SOL = "STAKE_SOL",
    UNSTAKE_SOL = "UNSTAKE_SOL",
    CLAIM_REWARDS = "CLAIM_REWARDS",

    // DeFi Related
    SWAP = "SWAP",
    INIT_SWAP = "INIT_SWAP",
    CANCEL_SWAP = "CANCEL_SWAP",
    REJECT_SWAP = "REJECT_SWAP",
    CREATE_POOL = "CREATE_POOL",
    ADD_LIQUIDITY = "ADD_LIQUIDITY",
    WITHDRAW_LIQUIDITY = "WITHDRAW_LIQUIDITY",

    // Loan Related
    LOAN = "LOAN",
    REPAY_LOAN = "REPAY_LOAN",
    OFFER_LOAN = "OFFER_LOAN",
    RESCIND_LOAN = "RESCIND_LOAN",
    TAKE_LOAN = "TAKE_LOAN",
    FORECLOSE_LOAN = "FORECLOSE_LOAN",

    // Funder Related
    AUTHORIZE_FUNDER = "AUTHORIZE_FUNDER",
    DEAUTHORIZE_FUNDER = "DEAUTHORIZE_FUNDER",
    FUND_REWARD = "FUND_REWARD",
    CANCEL_REWARD = "CANCEL_REWARD",
    LOCK_REWARD = "LOCK_REWARD",
    PAYOUT = "PAYOUT",

    // Generic Transaction Related
    PLATFORM_FEE = "PLATFORM_FEE",
    CLOSE_ACCOUNT = "CLOSE_ACCOUNT",
    WITHDRAW_GEM = "WITHDRAW_GEM",
    DEPOSIT_GEM = "DEPOSIT_GEM",

    // Subscription/Purchase Related
    BUY_SUBSCRIPTION = "BUY_SUBSCRIPTION",
    CREATE_RAFFLE = "CREATE_RAFFLE",
    UPDATE_RAFFLE = "UPDATE_RAFFLE",
    BUY_TICKETS = "BUY_TICKETS",

    // Program Related
    FINALIZE_PROGRAM_INSTRUCTION = "FINALIZE_PROGRAM_INSTRUCTION",
    UPGRADE_PROGRAM_INSTRUCTION = "UPGRADE_PROGRAM_INSTRUCTION",

    // Transaction Management
    EXECUTE_TRANSACTION = "EXECUTE_TRANSACTION",
    APPROVE_TRANSACTION = "APPROVE_TRANSACTION",
    ACTIVATE_TRANSACTION = "ACTIVATE_TRANSACTION",
    CREATE_TRANSACTION = "CREATE_TRANSACTION",
    REJECT_TRANSACTION = "REJECT_TRANSACTION",
    CANCEL_TRANSACTION = "CANCEL_TRANSACTION",
    ADD_INSTRUCTION = "ADD_INSTRUCTION",

    // Metadata Related
    ATTACH_METADATA = "ATTACH_METADATA",
    REQUEST_PNFT_MIGRATION = "REQUEST_PNFT_MIGRATION",
    START_PNFT_MIGRATION = "START_PNFT_MIGRATION",
    MIGRATE_TO_PNFT = "MIGRATE_TO_PNFT",

    // Other Types
    CREATE_APPRAISAL = "CREATE_APPRAISAL",
    FUSE = "FUSE",
    FRACTIONALIZE = "FRACTIONALIZE",
    DEPOSIT_FRACTIONAL_POOL = "DEPOSIT_FRACTIONAL_POOL",
    UNLABELED = "UNLABELED"
}

export enum WebhookType {
    ENHANCED = 'enhanced',
    RAW = 'raw',
    DISCORD = 'discord',
    ENHANCED_DEVNET = 'enhancedDevnet',
    RAW_DEVNET = 'rawDevnet',
    DISCORD_DEVNET = 'discordDevnet'
}

export interface ParsedTransaction {
    accountData: {
        account: string;
        nativeBalanceChange: number;
        tokenBalanceChanges: Array<{
            mint: string;
            amount: number;
            decimals: number;
            userAccount?: string;
            tokenAccount?: string;
        }>;
    }[];
    description: string;
    events: any;
    fee: number;
    feePayer: string;
    signature: string;
    slot: number;
    source: string;
    timestamp: number;
    tokenTransfers: {
        fromTokenAccount: string;
        fromUserAccount: string;
        toTokenAccount: string;
        toUserAccount: string;
        mint: string;
        tokenAmount: number;
        tokenStandard: string;
    }[];
    nativeTransfers: {
        fromUserAccount: string;
        toUserAccount: string;
        amount: number;
    }[];
    type: TransactionType;
}

export interface WebhookConfig {
    webhookId: string;
    accountAddresses: string[];
    transactionTypes: TransactionType[];
    webhookType: WebhookType;
    authHeader: string;
}
