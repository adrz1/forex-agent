export interface CurrencyPrice{
    currency:string;
    price:string;
}

export interface CurrencyPriceList{
    base_currency: string;
    marketplace: string;
    prices: CurrencyPrice[];
}