export  enum Operation{
    SELL= 'sell',
    BUY = 'buy'
}


export interface TransactionRequest{
    currency:string;
    amount:number;
    maximunPrice?:number;
    minimumPrice?:number;
}