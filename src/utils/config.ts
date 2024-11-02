import { TokenInfo } from '../types/index.js';

export const COMMON_TOKENS: { [key: string]: TokenInfo } = {
    // Native SOL wrapper
    'So11111111111111111111111111111111111111112': {
        address: 'So11111111111111111111111111111111111111112',
        symbol: 'SOL',
        name: 'Wrapped SOL',
        decimals: 9
    },
    // Stablecoins
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6
    },
    'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': {
        address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        symbol: 'USDT',
        name: 'USDT',
        decimals: 6
    },
    // Other notable tokens
    'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So': {
        address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
        symbol: 'mSOL',
        name: 'Marinade Staked SOL',
        decimals: 9
    },
    'DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ': {
        address: 'DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ',
        symbol: 'DUST',
        name: 'DUST Protocol',
        decimals: 9
    },
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': {
        address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        symbol: 'BONK',
        name: 'Bonk',
        decimals: 5
    }
};

export const KNOWN_PROGRAMS = {
    // Jupiter
    JUPITER_V1: 'JUP6i4ozu5ydDCnLiMogSckDPpbtr7BJ4FtzYWkb5Rk',
    JUPITER_V2: 'JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo',
    JUPITER_V3: 'JUP3c2Uh3WA4Ng34tw6kPd2G4C5BB21Xo36Je1s32Ph',
    JUPITER_V4: 'JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB',
    JUPITER_LIMIT_ORDER: 'jupoNjAxXgZ4rjzxzPMP4oxduvQsQtZzyknqvzYNrNu',

    // Raydium
    RAYDIUM_LIQUIDITY_POOL_V2: 'RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr',
    RAYDIUM_LIQUIDITY_POOL_V3: '27haf8L6oxUeXrHrgEgsexjSY5hbVUWEmvv9Nyxg8vQv',
    RAYDIUM_LIQUIDITY_POOL_V4: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',

    // Orca
    ORCA_TOKEN_SWAP_V1: 'DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1',
    ORCA_TOKEN_SWAP_V2: '9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP',
    ORCA_WHIRLPOOLS: 'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc',

    // Serum/Openbook
    SERUM_DEX_V1: 'BJ3jrUzddfuSrZHXSCxMUUQsjKEyLmuuyZebkcaFp2fg',
    SERUM_DEX_V2: 'EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o',
    SERUM_DEX_V3: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin',
    SERUM_SWAP: '22Y43yTVxuUkoRKdm9thyRhQ3SdgQS7c7kB6UNCiaczD',

    // Aldrin
    ALDRIN_AMM_V1: 'AMM55ShdkoGRB5jVYPjWziwk8m5MpwyDgsMWHaMSQWH6',
    ALDRIN_AMM_V2: 'CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4',

    // Saber
    SABER_STABLE_SWAP: 'SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ',
    SABER_EXCHANGE: 'YAkoNb6HKmSxQN9L8hiBE5tPJRsniSSMzND1boHmZxe',

    // Other DEXes
    CREMA: '6MLxLqiXaaSUpkgMnWDTuejNZEz3kE7k2woyHGVFw319',
    LIFINITY: 'EewxydAPCCVuNEyrVN68PuSYdQ7wKn27V9Gjeoi8dy3S',
    LIFINITY_V2: '2wT8Yq49kHgDzXuPxZSaeLaH1qbmGXtEyPy64bL7aD3c',
    CYKURA: 'cysPXAjehMpVKUapzbMCCnpFxUFFryEWEaLgnb9NrR8',
    STEP_FINANCE: 'SSwpMgqNDsyV7mAgN9ady4bDVu5ySjmmXejXvy2vLt1',
    CROPPER: 'CTMAxxk34HjKWxQ3QLZK1HpaLXmBveao3ESePXbiyfzh',
    SAROS_AMM: 'SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr',
    SENCHA_EXCHANGE: 'SCHAtsf8mbjyjiv4LkhLKutTf6JnZAbdJKFkXQNMFHZ',
    MERCURIAL_STABLE_SWAP: 'MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky',
    FOXY_SWAP: '8guzmt92HbM7yQ69UJg564hRRX6N4nCdxWE5L6ENrA8P',
    HADE_SWAP: 'hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu',
    ZETA: 'ZETAx4NhMsyop6gVwH2E2RrAcDiuPs9ABkhLBEvBsb6',
    MARINADE: 'MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD',

    // System Programs
    SYSTEM_PROGRAM: '11111111111111111111111111111111',
    TOKEN_PROGRAM: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    COMPUTE_BUDGET: 'ComputeBudget111111111111111111111111111111'
} as const;

export const PROTOCOL_SOURCES = {
    JUPITER: 'JUPITER',
    RAYDIUM: 'RAYDIUM',
    ORCA: 'ORCA',
    SERUM: 'SERUM',
    ALDRIN: 'ALDRIN',
    CREMA: 'CREMA',
    LIFINITY: 'LIFINITY',
    CYKURA: 'CYKURA',
    STEP_FINANCE: 'STEP_FINANCE',
    CROPPER: 'CROPPER',
    SAROS: 'SAROS',
    SENCHA: 'SENCHA_EXCHANGE',
    SABER: 'SABER',
    MERCURIAL: 'MERCURIAL_STABLE_SWAP',
    FOXY: 'FOXY',
    HADESWAP: 'HADESWAP',
    ZETA: 'ZETA',
    MARINADE: 'MARINADE',
    METEORA: 'METEORA'
} as const;

export const PROTOCOL_GROUPS = {
    AMM: [
        PROTOCOL_SOURCES.RAYDIUM,
        PROTOCOL_SOURCES.ORCA,
        PROTOCOL_SOURCES.ALDRIN,
        PROTOCOL_SOURCES.CREMA,
        PROTOCOL_SOURCES.LIFINITY
    ],
    AGGREGATOR: [
        PROTOCOL_SOURCES.JUPITER
    ],
    ORDERBOOK: [
        PROTOCOL_SOURCES.SERUM
    ],
    STABLE_SWAP: [
        PROTOCOL_SOURCES.SABER,
        PROTOCOL_SOURCES.MERCURIAL
    ]
} as const;

export const MARKETPLACE_SOURCES = {
    MAGIC_EDEN: 'MAGIC_EDEN',
    TENSOR: 'TENSOR',
    HYPERSPACE: 'HYPERSPACE',
    SOLANART: 'SOLANART',
    CORAL_CUBE: 'CORAL_CUBE'
} as const;

export const CONFIG = {
    MAX_BATCH_SIZE: 100,
    DEFAULT_PORT: 5420,
    DEFAULT_HOST: '0.0.0.0',
    HELIUS_RPC_URL: 'https://mainnet.helius-rpc.com/',
    WEBSOCKET_EVENTS_PORT: 5421,
    TRANSACTION_TYPES: ['SWAP', 'TRANSFER', 'ADD_LIQUIDITY', 'WITHDRAW_LIQUIDITY'],
    DEFAULT_LOG_LEVEL: 'info'
} as const;

// Additional Constants
export const BURN_ADDRESS = '1111111111111111111111111111111111111111111';
export const NULL_ADDRESS = '11111111111111111111111111111111';

export const TXN_STATUS = {
    SUCCESS: 'success',
    FAILED: 'failed',
    ALL: 'all'
} as const;
