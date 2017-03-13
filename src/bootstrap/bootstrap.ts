import * as express from 'express';
import * as chalk from 'chalk';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as https from 'https';
import * as socketio from 'socket.io';
import 'reflect-metadata';

import { IServerConfig } from "../server/server-config.interface";
import { IUnisonApp } from "../app/app.interface";
import { Injector } from "../dependency-injection/dependency-injection";
import { ComponentRegister } from '../components/component';
import { SocketRegister } from "../socket/socket";

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
    private server: http.Server;
    private io: SocketIO.Server;

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
    public bootstrap(unisonApp: any): void {

        if (Reflect.hasMetadata('unison:app', unisonApp)) {

            this.metadata = Reflect.getMetadata('unison:app', unisonApp);

            // Setup the application server.
            this.application = express();
            this.application.use(bodyParser.urlencoded({ extended: false }));
            this.application.use(bodyParser.json());

            this.server = http.createServer(this.application);
            this.io = socketio(this.server);

            // Setup app injectables.
            this.injectables = new Injector(this.metadata.injectables || []).getInjectables();

            // Setup application components.
            let viewManager = new ComponentRegister(this.metadata.components, this.injectables, this.application);

            // Setup socket.io
            let socketManager = new SocketRegister(this.metadata.components, this.injectables, this.io);

            // Start the server.
            this.server.listen(this.serverConfig.port, this.serverConfig.host, () => {
                console.log(chalk.bgGreen.black(`Listening on port ${this.serverConfig.port}`));
            });

        } else {
            console.error(chalk.bgRed('Error: Bootstrapped application must be decorated with the @UnisonApp decorator.'))
        }

    }

}
