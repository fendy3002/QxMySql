module.exports = {
    app: {
        port: process.env.PORT || 9199,
        env: process.env.NODE_ENV || "development",
        hot: process.env.HOT,
        startHot: process.env.START_HOT,
        debug: process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true',
        openAnalyzer: process.env.OPEN_ANALYZER === 'true'
    }
};