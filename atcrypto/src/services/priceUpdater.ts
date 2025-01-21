import axios from 'axios';

interface Crypto {
    id: number;
    current_price: number;
}

interface PriceUpdaterConfig {
    minChangePercent: number;
    maxChangePercent: number;
    intervalMs: number;
    apiUrl: string;
}

export class PriceUpdaterService {
    private isRunning: boolean;
    private updateInterval: NodeJS.Timer | null;
    private readonly config: PriceUpdaterConfig;

    constructor(config: Partial<PriceUpdaterConfig> = {}) {
        this.isRunning = false;
        this.updateInterval = null;
        this.config = {
            minChangePercent: 0.5,
            maxChangePercent: 3,
            intervalMs: 10000,
            apiUrl: 'http://localhost:3000/api',
            ...config
        };
    }

    private generateRandomChange(): number {
        const { minChangePercent, maxChangePercent } = this.config;
        const range = maxChangePercent - minChangePercent;
        const randomChange = minChangePercent + Math.random() * range;
        return Math.random() > 0.5 ? randomChange : -randomChange;
    }

    private async updatePrices(): Promise<void> {
        try {
            const response = await axios.get<Crypto[]>(
                `${this.config.apiUrl}/cryptos/price`
            );
            const cryptos = response.data;

            for (const crypto of cryptos) {
                const changePercent = this.generateRandomChange();
                const newPrice = crypto.current_price * (1 + changePercent / 100);

                await axios.post(`${this.config.apiUrl}/cryptos/update-price`, {
                    id: crypto.id,
                    price: newPrice
                });
            }

            console.log('Prices updated successfully');
        } catch (error) {
            console.error('Error updating prices:', error instanceof Error ? error.message : error);
        }
    }

    public start(): void {
        if (this.isRunning) return;

        this.isRunning = true;
        this.updateInterval = setInterval(
            () => { void this.updatePrices(); },
            this.config.intervalMs
        );

        console.log('Price updater service started');
    }

    public stop(): void {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            this.isRunning = false;
            console.log('Price updater service stopped');
        }
    }

    public isServiceRunning(): boolean {
        return this.isRunning;
    }
}