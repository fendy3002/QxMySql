let express = require('express');
let router = express.Router();
let appConfig = require('../../config/default/app.js');

let baseUrl = 'http://localhost:' + appConfig.app.serverPort;
let context = {
    api: {
        connection: {
            insert: baseUrl + "/connection",
            list: baseUrl + "/connection",
            testConnection: baseUrl + "/connection/testconnection",
            openConnection: baseUrl + "/connection/openconnection",
        },
        context: {
            get: baseUrl + "/context"
        }
    }
};

module.exports = context;