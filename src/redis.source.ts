import { RedisClient } from "redis";
import { SubscriptionError } from "./lib/errors/subscription.error";
import { CurrencyPriceList } from "./lib/interfaces/currency.interface";
import { Publisher } from "./lib/interfaces/publisher.interface";
import { DataSource } from "./lib/interfaces/source.interface";
import { Operation, TransactionRequest } from "./lib/interfaces/transaction.interface";

export class RedisSource implements DataSource, Publisher{
    client: RedisClient | null = null;
    listeners: Map<string,(message:string)=>void> = new Map();
    constructor(){
        try{
            this.client = new RedisClient({
                port: 6379,
                host: process.env.REDIS_HOST || 'localhost'
            });
        }catch(e){
            console.error(e);
        }
    }
    buy(data: TransactionRequest):void{
        this.client?.publish(Operation.BUY,JSON.stringify(data));
    }

    sell(data: TransactionRequest):void {
        this.client?.publish(Operation.SELL,JSON.stringify(data));
    }


    public listen(topic: string, callback: (message: string) => void) {
        try {

            this.client?.on('message', (channel,message)=>{
                const callback = this.listeners.get(channel);
                if(callback){
                    callback(message);
                }
            });
            this.client?.subscribe(topic);
            this.listeners.set(topic,callback);
        } catch(e) {
            console.error(e.message);
            throw new SubscriptionError();
        }
    }

    start():void{
        
    }
}