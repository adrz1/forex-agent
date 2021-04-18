var redis = require("redis");

DEBUG = (process.env.DEBUG || 'n').toLowerCase().startsWith("y")
REDIS_HOST = process.env.REDIS_HOST || 'localhost'

const log = require('simple-node-logger').createSimpleLogger();
if (DEBUG)
    log.setLevel('debug');
else
    log.setLevel('info');

log.debug(`Conecting to redis on ${REDIS_HOST}`)

var subscriber = redis.createClient({
    host: process.env.REDIS_HOST
});

subscriber.on("message", function (channel, message) {
    log.debug("Message: " + message + " on channel: " + channel + " is arrive!");
});

subscriber.subscribe("currency_prices");
