import { AgentOptions } from "./lib/interfaces/agent.options.interface";
import { Operation, TransactionRequest } from "./lib/interfaces/transaction.interface";
import { MyAgent } from "./test.agent";
import { DatabaseService } from "./lib/services/database.service";
import { CoinBaseSource } from "./sources/coinbase/coinbase.source";
import { Server } from "./lib/server";

//ESTABLISH DATABASE CONNECTION
const dataBase: DatabaseService = new DatabaseService();

//CREATE AN AGENT TO PROCESS CURRENCY INFO
const agentOptions: AgentOptions = {
    //SET THE AGENT SOURCE OF INFORMATION
    source: new CoinBaseSource(),

    //SET BUY OPERATION TO THE AGENT
    buy: (data: TransactionRequest) => {
        dataBase.publish(Operation.BUY, JSON.stringify(data));
    },
    //SET SELL OPERTAION TO THE AGENT
    sell: (data: TransactionRequest) => {
        dataBase.publish(Operation.SELL, JSON.stringify(data));
    }
}
const agent = new MyAgent(agentOptions);

//START THE SERVER
const server: Server = new Server(dataBase);

server.start(agent);