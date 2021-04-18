import { CoinBaseAgent } from "./coinbase/agent/coinbase.agent";
import { Operation, TransactionRequest } from "./interfaces/transaction.interface";
import { DatabaseService } from "./services/database.service";

class Server{
    private initLogger(){
        console.log('SETTING DEBUGGER');
        const log = require('simple-node-logger').createSimpleLogger();
        if ((process.env.DEBUG || 'n').toLowerCase().startsWith("y"))
            log.setLevel('debug');
        else
            log.setLevel('info');
        console.log = log.info;
        console.debug = log.debug;
        console.error = log.error;
        console.warn = log.warn;
        console.log('DEBUGGER SETTED');
    }
    start(){
        this.initLogger();
        
        //ESTABLISH DATABASE CONNECTION
        const dataBase:DatabaseService = new DatabaseService();

        //CREATE AN AGENT TO PROCESS CURRENCY INFO
        const agent = new CoinBaseAgent();

        //SET BUY OPERATION TO THE AGENT
        agent.buy = (data:TransactionRequest)=>{
            dataBase.publish(Operation.BUY,JSON.stringify(data));
        };

        //SET SELL OPERTAION TO THE AGENT
        agent.sell = (data:TransactionRequest)=>{
            dataBase.publish(Operation.SELL,JSON.stringify(data));
        };

        //START LISENING EVENTS
        dataBase.listen('currency_prices',(message:string) => agent.execute(message));

    }
}

const server:Server = new Server();
server.start();