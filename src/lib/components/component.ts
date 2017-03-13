import { Application } from "express";
import { RouteRegister } from "./route/route";
import { SocketRegister } from "./socket/socket";

/**
 * @description Registers application views.
 * 
 * @export
 * @class ViewRegister
 */
export class ComponentRegister {

    private routeRegister: RouteRegister;
    private socketRegister: SocketRegister;

    constructor(
        private components: Array<any>,
        private injectables: Object,
        private application: Application,
        private io: SocketIO.Server
    ) {
        // Register Routes
        this.routeRegister 
            = new RouteRegister(this.components, this.injectables, this.application);

        // Register Sockets
        this.socketRegister
            = new SocketRegister(this.components, this.injectables, this.io);
    }


}
