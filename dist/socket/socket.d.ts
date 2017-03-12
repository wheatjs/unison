/// <reference types="socket.io" />
/**
 * @description Registers Application Sockets
 *
 * @export
 * @class SocketRegister
 */
export declare class SocketRegister {
    private components;
    private injectables;
    private io;
    private commandRegister;
    constructor(components: Array<any>, injectables: Object, io: SocketIO.Server);
    private initialize();
    private register();
}
