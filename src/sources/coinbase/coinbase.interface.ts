//COINBASE INTERFACES
export interface CoinbaseCurrencyPrice{
    currency:string;
    price:string;
}

export interface CoinbaseCurrencyPriceList{
    base_currency: string;
    marketplace: string;
    prices: CoinbaseCurrencyPrice[];
}