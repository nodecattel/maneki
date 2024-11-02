// src/handlers/webhook.handler.ts

import { Request, Response } from 'express';
import { TransactionFormatter } from '../utils/transaction-formatter.js';
import { WalletManager } from '../utils/wallet-manager.js';
import { TransactionParser } from '../utils/transaction-parser.js';
import { ParsedTransaction } from '../types/index.js';

export class WebhookHandler {
    private formatter: TransactionFormatter;
    private walletManager: WalletManager;
    private parser: TransactionParser;

    constructor() {
        this.formatter = new TransactionFormatter();
        this.walletManager = new WalletManager();
        this.parser = new TransactionParser();
    }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            // Validate auth header
            const authHeader = req.header('authorization');
            if (!authHeader || authHeader !== process.env.AUTH_HEADER) {
                console.log('⚠️ Invalid auth header:', authHeader);
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            // Process single transaction or batch
            const transactions = Array.isArray(req.body) ? req.body : [req.body];
            
            console.log(`📥 Received ${transactions.length} transaction(s)`);
            
            for (const transaction of transactions) {
                try {
                    // Parse raw transaction data and cast it to the formatter's expected type
                    const parsedTx = this.parser.parse(transaction);
                    const formattedOutput = await this.formatter.format(parsedTx as any, this.walletManager);
                    
                    // Log the formatted output
                    console.log(formattedOutput);
                } catch (error) {
                    console.error('❌ Error processing transaction:', error);
                    console.log('📋 Raw transaction data:', JSON.stringify(transaction, null, 2));
                }
            }

            // Send success response
            res.status(200).json({ 
                status: 'success', 
                message: `Processed ${transactions.length} transaction(s)` 
            });

        } catch (error) {
            console.error('❌ Error handling webhook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
