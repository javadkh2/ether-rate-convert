/**
 * this file is entry point of application
 */

import app from "./app";
import config from "./config";

// tslint:disable-next-line: no-console
app.listen(config.port, () => console.log(`Service booted at ${new Date()}`));
