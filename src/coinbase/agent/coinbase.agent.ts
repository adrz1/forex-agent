import { Currency } from "../../interfaces/currency.interface";
import { Agent } from "../../services/agent.service";
import { CoinbaseCurrencyPrice, CoinbaseCurrencyPriceList } from "../interfaces/coinbase.interface";

//COINBASE AGENT IMPLEMENTATION
export class CoinBaseAgent extends Agent{    
    //PARSE AND SEND INFORMATION BACK TO THE AGENT BASE CLASS
    execute(message:string): void {
        const list:CoinbaseCurrencyPriceList = JSON.parse(message);
        this.analyse(list.prices.map(this.mapToCurrency));
    }

    //MAPPING FROM COINBASE IMPLEMENTATION TO AGNOSTIC INTERFACES
    mapToCurrency(coinbaseCurreny:CoinbaseCurrencyPrice):Currency{
        return {name:coinbaseCurreny.currency,price:parseFloat(coinbaseCurreny.price)};
    }
}