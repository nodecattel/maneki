import express from 'express';
import dotenv from 'dotenv';
import { HeliusAPI } from './api/helius-webhook.api.js';
import { WebhookHandler } from './handlers/webhook.handler.js';
import { CONFIG } from './utils/config.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.HELIUS_API_KEY) {
    console.error('❌ HELIUS_API_KEY is required in .env file');
    process.exit(1);
}

if (!process.env.WEBHOOK_ID) {
    console.error('❌ WEBHOOK_ID is required in .env file');
    process.exit(1);
}

class App {
    private app: express.Application;
    private heliusApi!: HeliusAPI;
    private webhookHandler!: WebhookHandler;

    constructor() {
        this.app = express();
        this.setupServices();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupServices(): void {
        this.heliusApi = new HeliusAPI(process.env.HELIUS_API_KEY!);
        this.webhookHandler = new WebhookHandler();
    }

    private setupMiddleware(): void {
        // Increase JSON payload limit for large webhook batches
        this.app.use(express.json({ limit: '10mb' }));

        // Request logging middleware
        this.app.use((req, _res, next) => {
            console.log('\n=== New Request ===');
            console.log('Time:', new Date().toISOString());
            console.log('Method:', req.method);
            console.log('Path:', req.path);
            console.log('IP:', req.ip);
            next();
        });
    }

    private setupRoutes(): void {
        // Webhook endpoint
        this.app.post('/webhook', (req, res) => this.webhookHandler.handle(req, res));

        // Health check endpoint
        this.app.get('/health', (_req, res) => {
            res.json({ 
                status: 'healthy',
                timestamp: new Date().toISOString(),
                config: {
                    webhookId: process.env.WEBHOOK_ID,
                }
            });
        });
    }

    public async start(): Promise<void> {
        try {
            // Sync webhook addresses with wallets.csv
            await this.heliusApi.syncWebhookAddresses(process.env.WEBHOOK_ID!);

            const port = Number(process.env.PORT) || 5420;
            const numericPort = Number(port) || 5420; // Ensures compatibility in `listen` call
            this.app.listen(numericPort, CONFIG.DEFAULT_HOST, () => {
                console.log('\n=== Maneki Webhook Server Started ===');
                console.log(`⏰ Time: ${new Date().toISOString()}`);
                console.log(`🌐 URL: http://${CONFIG.DEFAULT_HOST}:${port}/webhook`);
                console.log(`🏥 Health: http://${CONFIG.DEFAULT_HOST}:${port}/health`);

                // Log webhook configuration
                this.logWebhookConfig();

                console.log('\n⏳ Waiting for webhooks...\n');
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }

    private async logWebhookConfig(): Promise<void> {
        try {
            const config = await this.heliusApi.getWebhookConfig(process.env.WEBHOOK_ID!);
            if (config) {
                console.log('\n📋 Webhook Configuration:');
                console.log('- ID:', config.webhookId);
                console.log('- Transaction Types:', config.transactionTypes.join(', '));
                console.log('- Addresses:', config.accountAddresses.length);
                config.accountAddresses.forEach((addr: string) => console.log(`  - ${addr}`));
            }
        } catch (error) {
            console.error('Failed to fetch webhook config:', error);
        }
    }
}

// Start the application
const app = new App();
app.start().catch(err => {
    console.error('Application failed to start:', err);
    process.exit(1);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
    console.log('\nReceived SIGTERM. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nReceived SIGINT. Shutting down gracefully...');
    process.exit(0);
});
