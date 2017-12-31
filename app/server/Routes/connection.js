let express = require('express');
let router = express.Router();
let qz = require('@fendy3002/qz-node').default();
let controllers = require('../Controllers');
let middlewares = require("../Middlewares");
let log = qz.logs.console();

let Service = (config, log) => {
    router.get('/', controllers.connection.index(config, log)._get);
    router.put('/', controllers.connection.index(config, log)._put);
    router.post('/testconnection', controllers.connection.testConnection(config, log)._post);
    router.post('/openconnection', controllers.connection.openConnection(config, log)._post);

    return router;
}

module.exports = Service;