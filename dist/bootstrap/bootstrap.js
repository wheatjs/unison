"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
require("reflect-metadata");
const dependency_injection_1 = require("../dependency-injection/dependency-injection");
const view_1 = require("../view/view");
const socket_1 = require("../socket/socket");
/**
 * Unison Web Server
 *
 * @export
 * @class UnisonServer
 */
class UnisonServer {
    constructor(serverConfig) {
        this.serverConfig = serverConfig;
    }
    /**
     * Bootstraps a Unison App.
     *
     * @param {Function} unisonApp
     *
     * @memberOf UnisonServer
     */
    bootstrap(unisonApp) {
        if (Reflect.hasMetadata('unison:app', unisonApp)) {
            this.metadata = Reflect.getMetadata('unison:app', unisonApp);
            // Setup the application server.
            this.application = express();
            this.application.use(bodyParser.urlencoded({ extended: false }));
            this.application.use(bodyParser.json());
            this.server = http.createServer(this.application);
            this.io = socketio(this.server);
            // Setup app injectables.
            this.injectables = new dependency_injection_1.Injector(this.metadata.injectables || []).getInjectables();
            // Setup application views.
            let viewManager = new view_1.ViewRegister(this.metadata.components, this.injectables, this.application);
            let socketManager = new socket_1.SocketRegister(this.metadata.components, this.injectables, this.io);
            // Setup Socket.io
            // this.io.on('connection', (socket) => {
            //     console.log('Connected');
            // });
            // Start the server.
            this.server.listen(this.serverConfig.port, this.serverConfig.host, () => {
                console.log(chalk.bgGreen.black(`Listening on port ${this.serverConfig.port}`));
            });
        }
        else {
            console.error(chalk.bgRed('Error: Bootstrapped application must be decorated with the @UnisonApp decorator.'));
        }
    }
}
exports.UnisonServer = UnisonServer;
