let express = require('express');
let qz = require('@fendy3002/qz-node').default();
let bodyParser = require('body-parser')

let App = (appConf, log) => {
    let app = express();

    app.use(bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/connection', require('./Routes/connection')(appConf, log));
    app.use('/database', require('./Routes/database')(appConf, log));
    app.use('/query', require('./Routes/query')(appConf, log));
    
    app.listen(appConf.app.serverPort, () => 
        console.log('Example app listening on port ' + appConf.app.serverPort + '!')
    );
    return app;
}

export default App;