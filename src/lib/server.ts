import { Agent } from "./agent/agent";
import { DatabaseService } from "./services/database.service";

export class Server{
    private initLogger() {
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
    constructor(private dataBase:DatabaseService){
        this.initLogger();
    }

    start(agent:Agent) {
        //START LISENING EVENTS
        this.dataBase.listen('currency_prices', (message: string) => agent.execute(message));
    }
}