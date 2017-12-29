let express = require('express');
let router = express.Router();
let appConfig = require('../../config/default/app.js');

let baseUrl = 'http://localhost:' + appConfig.app.serverPort;
let context = {
    api: {
        connection: {
            insert: baseUrl + "/connection",
            list: baseUrl + "/connection"
        },
        context: {
            get: baseUrl + "/context"
        }
    }
};

module.exports = context;