require("dotenv").config({path: ".env" });
let path = require("path");

module.exports = {
    app: {
        port: process.env.APP_PORT || 9199,
        serverPort: process.env.SERVER_PORT || 9200,
        env: process.env.NODE_ENV || "development",
        hot: process.env.HOT,
        startHot: process.env.START_HOT,
        debug: process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true',
        openAnalyzer: process.env.OPEN_ANALYZER === 'true'
    },
    path: {
        config: path.resolve('./config')
    }
};