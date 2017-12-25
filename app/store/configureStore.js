
import dotenv from "dotenv";
dotenv.config();

import appConf from '../../config/default/app.js'

// @flow
if (appConf.app.env === 'production') {
  module.exports = require('./configureStore.prod'); // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.dev'); // eslint-disable-line global-require
}
