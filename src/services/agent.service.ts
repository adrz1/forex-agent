import { Currency } from "../interfaces/currency.interface";
import { TransactionRequest } from "../interfaces/transaction.interface";

export abstract class Agent {

    //CURRENCIES TO WATCH FOR
    private currencies:string[] = (process.env.CURRENCIES || 'BTC,ETH').split(',');

    //DEFAULT IMPLEMENTAION FOR BUY AND SELL OPERATIONS
    buy: (data: TransactionRequest) => void = (data) => { console.log('buy', data) };
    sell: (data: TransactionRequest) => void = (data) => { console.log('sell', data) };

    //PARSE THIRD PARTY INTERFACE
    abstract execute(message: string): void;

    //CALLBACK FROM AGENT IMPLEMENTATION
    protected analyse(currencies:Currency[]){
        const target = currencies.filter(currency => this.currencies.indexOf(currency.name) > -1);
        target.forEach((currency:Currency) => this.analyseCurrency(currency));
    }


    //TODO: Do a real analysis
    prices:Map<string,number> = new Map();
    private analyseCurrency(currency: Currency) {
        const last = this.prices.get(currency.name);
        if(last){
            const sign = currency.price > last ? '↑' : currency.price < last ? '↓' : '-';
            console.log(currency.name,' ', currency.price, ' ',sign);
        }
        this.prices.set(currency.name,currency.price);
    }
}