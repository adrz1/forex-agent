import { DataSource } from "./source.interface";
import { TransactionRequest } from "./transaction.interface";

export interface AgentOptions{
    buy:(data: TransactionRequest) => void;
    sell:(data: TransactionRequest) => void;
}