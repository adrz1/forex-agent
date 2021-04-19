
import { AgentOptions } from "../interfaces/agent.options.interface";
import { CurrencyPrice, CurrencyPriceList } from "../interfaces/currency.interface";
import { TransactionRequest } from "../interfaces/transaction.interface";

export abstract class Agent {
    //DEFAULT IMPLEMENTAION FOR BUY AND SELL OPERATIONS
    protected buy: (data: TransactionRequest) => void;
    protected sell: (data: TransactionRequest) => void;

    constructor(options:AgentOptions){
        this.buy = options.publisher.buy;
        this.sell = options.publisher.sell;
    }

    //CURRENCIES TO WATCH FOR
    protected currencies:string[] = (process.env.CURRENCIES || 'BTC,ETH').split(',');
    
    //READ 
    public onData(message: string):void {
        this.analyse(JSON.parse(message));
    };

    //AGENT IMPLEMENTATION
    private analyse(currencies: CurrencyPriceList) {
        const target = currencies.prices.filter(currency => this.currencies.indexOf(currency.currency) > -1);
        target.forEach((currency: CurrencyPrice) => this.analyseCurrency(currency));
    }

    abstract analyseCurrency(currency:CurrencyPrice):void;
    
}