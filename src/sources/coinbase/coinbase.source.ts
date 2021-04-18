import { Currency } from "../../lib/interfaces/currency.interface";
import { DataSource } from "../../lib/interfaces/source.interface";
import { CoinbaseCurrencyPrice, CoinbaseCurrencyPriceList } from "./coinbase.interface";

//COINBASE DATA SOURCE IMPLEMENTATION
export class CoinBaseSource implements DataSource{    
    //PARSE AND SEND INFORMATION BACK TO THE AGENT CLASS
    read(message:string): Currency[] {
        const list:CoinbaseCurrencyPriceList = JSON.parse(message);
        return list.prices.map(this.mapToCurrency);
    }

    //MAPPING FROM COINBASE IMPLEMENTATION TO AGNOSTIC INTERFACES
    mapToCurrency(coinbaseCurreny:CoinbaseCurrencyPrice):Currency{
        return {name:coinbaseCurreny.currency,price:parseFloat(coinbaseCurreny.price)};
    }
}