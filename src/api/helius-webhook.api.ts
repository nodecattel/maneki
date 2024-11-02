import { Helius } from 'helius-sdk';
import { WalletManager } from '../utils/wallet-manager.js';
import { WebhookConfig, WebhookType } from '../types/index.js';

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
                webhookType: webhook.webhookType || WebhookType.ENHANCED, // Provide default value
                authHeader: webhook.authHeader || ''
            };
        } catch (error) {
            console.error('Error fetching webhook config:', error);
            return null;
        }
    }

    async getAllWebhooks(): Promise<WebhookConfig[]> {
        try {
            const webhooks = await this.client.getAllWebhooks();
            return webhooks.map(webhook => ({
                webhookId: webhook.webhookID,
                accountAddresses: webhook.accountAddresses,
                transactionTypes: webhook.transactionTypes,
                webhookType: webhook.webhookType || WebhookType.ENHANCED, // Provide default value
                authHeader: webhook.authHeader || ''
            }));
        } catch (error) {
            console.error('Error fetching all webhooks:', error);
            return [];
        }
    }

    async deleteWebhook(webhookId: string): Promise<boolean> {
        try {
            await this.client.deleteWebhook(webhookId);
            return true;
        } catch (error) {
            console.error('Error deleting webhook:', error);
            return false;
        }
    }

    async editWebhook(webhookId: string, updates: Partial<WebhookConfig>): Promise<WebhookConfig | null> {
        try {
            await this.client.editWebhook(webhookId, {
                accountAddresses: updates.accountAddresses,
                transactionTypes: updates.transactionTypes,
                webhookType: updates.webhookType || WebhookType.ENHANCED, // Provide default value
                authHeader: updates.authHeader
            });
            return this.getWebhookConfig(webhookId);
        } catch (error) {
            console.error('Error editing webhook:', error);
            return null;
        }
    }
}
