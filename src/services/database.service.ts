import { RedisClient } from "redis";
import { SubscriptionError } from "../errors/subscription.error";


//BASIC REDIS DATABASE IMPLEMENTATION
export class DatabaseService {
    client: RedisClient | null = null;
    listeners: Map<string,(message:string)=>void> = new Map();
    constructor() {
        try{
            this.client = new RedisClient({
                port: 6379,
                host: process.env.REDIS_HOST || 'localhost'
            });
        }catch(e){
            console.error(e);
        }
    }
    listen(topic: string, callback: (message: string) => void) {
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
    publish(channel:string,message:string){
        this.client?.publish(channel,message);
    }
}