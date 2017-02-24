import * as express from 'express';
import * as chalk from 'chalk';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';

import { IServerConfig } from "../server/server-config.interface";
import { IUnisonApp } from "../app/app.interface";
import { Injector } from "../dependency-injection/dependency-injection";
import { ViewRegister } from '../view/view';

/**
 * Unison Web Server
 * 
 * @export
 * @class UnisonServer
 */
export class UnisonServer {

    private application: express.Application;
    private metadata: IUnisonApp;
    private injectables: Object;

    constructor(
        private serverConfig: IServerConfig
    ) { }

    /**
     * Bootstraps a Unison App.
     * 
     * @param {Function} unisonApp 
     * 
     * @memberOf UnisonServer
     */
    public bootstrap(unisonApp: Function): void {

        if (Reflect.hasMetadata('unison:app', unisonApp)) {

            this.metadata = Reflect.getMetadata('unison:app', unisonApp);

            // Setup the application server.
            this.application = express();
            this.application.use(bodyParser.json({ type: 'application/*+json' }));

            // Setup app injectables.
            this.injectables = new Injector(this.metadata.services || []).getInjectables();

            // Setup application views.
            let viewManager = new ViewRegister(this.metadata.views, this.injectables, this.application);

            // Start the server.
            this.application.listen(this.serverConfig.port, this.serverConfig.host, () => {
                console.log(chalk.bgGreen.black(`Listening on port ${this.serverConfig.port}`));
            })

        } else {
            console.error(chalk.bgRed('Error: Bootstrapped application must be decorated with the @UnisonApp decorator.'))
        }

    }

}
