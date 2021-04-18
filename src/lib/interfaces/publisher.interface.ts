import { TransactionRequest } from "./transaction.interface";

export interface Publisher{
    buy(data: TransactionRequest):void;
    sell(data: TransactionRequest):void;
}