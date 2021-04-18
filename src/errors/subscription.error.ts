export class SubscriptionError implements Error{
    name: string;
    message: string;
    stack?: string;
    constructor(message?:string){
        this.name = 'Subscription Error';
        this.message = message || 'Cannot subscribe to topic';
    }
}