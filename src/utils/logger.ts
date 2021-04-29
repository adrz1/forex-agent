export class SimpleLogger{
    static initLogger() {
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
}