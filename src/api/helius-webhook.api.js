// src/api/helius.ts
import { Helius } from 'helius-sdk';
import { WalletManager } from '../utils/wallets';
import { WebhookConfig } from '../types';

export class HeliusAPI {
    private client: Helius;
    private wallets: WalletManager;

    constructor(apiKey: string) {
        this.client = new Helius(apiKey);
        this.wallets = new WalletManager();
    }

    async syncWebhookAddresses(webhookId: string): Promise<void> {
        try {
            const webhook = await this.client.getWebhookByID(webhookId);
            if (!webhook) {
                throw new Error(`Webhook ${webhookId} not found`);
            }

            const csvAddresses = this.wallets.getWallets();
            const currentAddresses = new Set(webhook.accountAddresses);
            const csvAddressSet = new Set(csvAddresses);

            // Find differences
            const addressesToAdd = csvAddresses.filter(addr => !currentAddresses.has(addr));
            const addressesToRemove = Array.from(currentAddresses)
                .filter(addr => !csvAddressSet.has(addr));

            // Update webhook if needed
            if (addressesToAdd.length > 0) {
                console.log('Adding addresses to webhook:', addressesToAdd);
                await this.client.appendAddressesToWebhook(webhookId, addressesToAdd);
            }

            if (addressesToRemove.length > 0) {
                console.log('Removing addresses from webhook:', addressesToRemove);
                await this.client.removeAddressesFromWebhook(webhookId, addressesToRemove);
            }

            console.log('Webhook synchronization complete');
        } catch (error) {
            console.error('Error syncing webhook addresses:', error);
            throw error;
        }
    }

    async getWebhookConfig(webhookId: string): Promise<WebhookConfig | null> {
        try {
            const webhook = await this.client.getWebhookByID(webhookId);
            if (!webhook) return null;

            return {
                webhookId: webhook.webhookID,
                accountAddresses: webhook.accountAddresses,
                transactionTypes: webhook.transactionTypes,
                webhookType: webhook.webhookType,
                authHeader: webhook.authHeader || ''
            };
        } catch (error) {
            console.error('Error fetching webhook config:', error);
            return null;
        }
    }
}
