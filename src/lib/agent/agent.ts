
import { AgentOptions } from "../interfaces/agent.options.interface";
import { Currency } from "../interfaces/currency.interface";
import { DataSource } from "../interfaces/source.interface";
import { TransactionRequest } from "../interfaces/transaction.interface";

export abstract class Agent {
    private source:DataSource;
    //DEFAULT IMPLEMENTAION FOR BUY AND SELL OPERATIONS
    protected buy: (data: TransactionRequest) => void;
    protected sell: (data: TransactionRequest) => void;

    constructor(options:AgentOptions){
        this.source = options.source;
        this.buy = options.buy;
        this.sell = options.sell;
    }

    //CURRENCIES TO WATCH FOR
    protected currencies:string[] = (process.env.CURRENCIES || 'BTC,ETH').split(',');
    
    //READ 
    public execute(message: string):void {
        this.analyse(this.source.read(message));
    };

    //AGENT IMPLEMENTATION
    private analyse(currencies: Currency[]) {
        const target = currencies.filter(currency => this.currencies.indexOf(currency.name) > -1);
        target.forEach((currency: Currency) => this.analyseCurrency(currency));
    }

    abstract analyseCurrency(currency:Currency):void;
    
}