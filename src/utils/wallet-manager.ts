import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { WalletInfo } from '../types/index.js';

export class WalletManager {
    private walletLabels: Map<string, string>;
    private readonly csvPath: string;

    constructor() {
        this.walletLabels = new Map();
        this.csvPath = process.env.WALLETS_FILE_PATH || './wallets.csv';
        this.loadWallets();
    }

    getLabelForAddress(address: string | undefined): string | undefined {
        if (!address) return undefined;
        return this.walletLabels.get(address);
    }

    loadWallets(): void {
        try {
            if (fs.existsSync(this.csvPath)) {
                const content = fs.readFileSync(this.csvPath, 'utf-8');
                const records = parse(content, {
                    columns: true,
                    skip_empty_lines: true
                });

                records.forEach((record: WalletInfo) => {
                    this.walletLabels.set(record.address, record.label);
                });

                console.log(`Loaded ${this.walletLabels.size} wallets from CSV`);
            } else {
                console.log('No wallets.csv found');
            }
        } catch (error) {
            console.error('Error loading wallets:', error);
        }
    }

    getWallets(): string[] {
        return Array.from(this.walletLabels.keys());
    }

    getLabel(address: string): string {
        const label = this.walletLabels.get(address);
        return label ? `${label} (${address.slice(0, 4)}...)` : address;
    }

    hasWallet(address: string): boolean {
        return this.walletLabels.has(address);
    }
}
