let express = require('express');
let router = express.Router();
let qz = require('@fendy3002/qz-node').default();
let controllers = require('../Controllers');
let middlewares = require("../Middlewares");
let log = qz.logs.console();

let Service = (config, log) => {
    router.post('/execute', controllers.query.execute(config, log)._post);
    return router;
}

module.exports = Service;