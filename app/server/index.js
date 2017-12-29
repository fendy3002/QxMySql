let express = require('express');
let qz = require('@fendy3002/qz-node').default();

let App = (appConf, log) => {
    let app = express();
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/connection', require('./Routes/connection')(appConf, log));

    app.listen(appConf.app.serverPort, () => 
        console.log('Example app listening on port ' + appConf.app.serverPort + '!')
    );
    return app;
}

export default App;