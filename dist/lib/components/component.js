"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route/route");
const socket_1 = require("./socket/socket");
/**
 * @description Registers application views.
 *
 * @export
 * @class ViewRegister
 */
class ComponentRegister {
    constructor(components, injectables, application, io) {
        this.components = components;
        this.injectables = injectables;
        this.application = application;
        this.io = io;
        // Register Routes
        this.routeRegister
            = new route_1.RouteRegister(this.components, this.injectables, this.application);
        // Register Sockets
        this.socketRegister
            = new socket_1.SocketRegister(this.components, this.injectables, this.io);
    }
}
exports.ComponentRegister = ComponentRegister;
