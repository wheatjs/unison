/// <reference types="express" />
/// <reference types="socket.io" />
import { Application } from "express";
/**
 * @description Registers application views.
 *
 * @export
 * @class ViewRegister
 */
export declare class ComponentRegister {
    private components;
    private injectables;
    private application;
    private io;
    private routeRegister;
    private socketRegister;
    constructor(components: Array<any>, injectables: Object, application: Application, io: SocketIO.Server);
}
