// @flow
import chalk from 'chalk';

import appConf from '../../config/default/app.js'

export default function CheckNodeEnv(expectedEnv: string) {
  if (!expectedEnv) {
    throw new Error('"expectedEnv" not set');
  }

  if (appConf.app.env !== expectedEnv) {
    console.log(chalk.whiteBright.bgRed.bold(
      `"process.env.NODE_ENV" must be "${expectedEnv}" to use this webpack config`
    ));
    process.exit(2);
  }
}
