import { CurrencyPrice } from "./lib/interfaces/currency.interface";
import { Agent } from "./lib/agent/agent";

export class DefaultAgent extends Agent {

    //TODO: Do a real analysis
    prices: Map<string, number> = new Map();
    analyseCurrency(currency: CurrencyPrice) {
        const last = this.prices.get(currency.currency);
        const price = parseFloat(currency.price);
        if (last) {
            const sign = price > last ? '↑' : price < last ? '↓' : '-';
            switch (sign) {
                case '↑':
                    this.buy({
                        currency:currency.currency,
                        amount:10,
                        maximunPrice: price
                    })
                    break;
                case '↓':
                    this.sell({
                        currency:currency.currency,
                        amount:10,
                        minimumPrice: price
                    })
                    break;
            }
            console.log(`Currency: ${sign} ${currency.currency}`);
        }
        this.prices.set(currency.currency, price);
    }
}