import { Currency } from "./lib/interfaces/currency.interface";
import { Agent } from "./lib/agent/agent";

export class MyAgent extends Agent {

    //TODO: Do a real analysis
    prices: Map<string, number> = new Map();
    analyseCurrency(currency: Currency) {
        const last = this.prices.get(currency.name);
        if (last) {
            const sign = currency.price > last ? '↑' : currency.price < last ? '↓' : '-';
            switch (sign) {
                case '↑':
                    this.buy({
                        currency:currency.name,
                        amount:10,
                        maximunPrice: currency.price
                    })
                    break;
                case '↓':
                    this.sell({
                        currency:currency.name,
                        amount:10,
                        minimumPrice: currency.price
                    })
                    break;
            }
        }
        this.prices.set(currency.name, currency.price);
    }
}