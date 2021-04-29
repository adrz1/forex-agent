import { AgentOptions } from "./lib/interfaces/agent.options.interface";
import { DefaultAgent } from "./default.agent";
import { RedisSource } from "./redis.source";
import { SimpleLogger } from './utils/logger';

SimpleLogger.initLogger();

//ESTABLISH DATABASE CONNECTION
const source: RedisSource = new RedisSource();

//CREATE AN AGENT TO PROCESS CURRENCY INFO
const agentOptions: AgentOptions = {
    //SET PUBLISHER TO THE AGENT
    publisher: source,
}

const agent = new DefaultAgent(agentOptions);
source.listen('currency_prices', (message: string) => agent.onData(message));

source.start();