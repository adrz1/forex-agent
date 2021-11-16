import { Publisher } from "./lib/interfaces/publisher.interface";
import { TransactionRequest } from "./lib/interfaces/transaction.interface";

export class Broker implements Publisher{
    buy(data: TransactionRequest): void {
        throw new Error("Method not implemented.");
    }
    sell(data: TransactionRequest): void {
        throw new Error("Method not implemented.");
    }

}