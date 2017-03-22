/// <reference types="socket.io" />
/**
 * @description Defines a socket listener.
 *
 * @export
 * @param {string} command
 * @returns {*}
 */
export declare function Socket(command: string): any;
export declare function IO(event: string): any;
export declare abstract class SocketIOServer {
    engine: {
        ws: any;
    };
    nsps: {
        [namespace: string]: SocketIO.Namespace;
    };
    sockets: SocketIO.Namespace;
    json: SocketIO.Server;
    checkRequest(req: any, fn: (err: any, success: boolean) => void): void;
    serveClient(): boolean;
    serveClient(v: boolean): SocketIO.Server;
    path(): string;
    path(v: string): SocketIO.Server;
    adapter(): any;
    adapter(v: any): SocketIO.Server;
    origins(): string;
    origins(v: string): SocketIO.Server;
    attach(srv: any, opts?: SocketIO.ServerOptions): SocketIO.Server;
    attach(port: number, opts?: SocketIO.ServerOptions): SocketIO.Server;
    listen(srv: any, opts?: SocketIO.ServerOptions): SocketIO.Server;
    listen(port: number, opts?: SocketIO.ServerOptions): SocketIO.Server;
    bind(srv: any): SocketIO.Server | void;
    onconnection(socket: any): SocketIO.Server | void;
    of(nsp: string): SocketIO.Namespace | void;
    close(fn?: () => void): void;
    on(event: "connection", listener: (socket: SocketIO.Socket) => void): SocketIO.Namespace;
    on(event: "connect", listener: (socket: SocketIO.Socket) => void): SocketIO.Namespace;
    on(event: string, listener: Function): SocketIO.Namespace;
    to(room: string): SocketIO.Namespace | void;
    in(room: string): SocketIO.Namespace | void;
    use(fn: (socket: SocketIO.Socket, fn: (err?: any) => void) => void): SocketIO.Namespace | void;
    emit(event: string, ...args: any[]): SocketIO.Namespace | void;
    send(...args: any[]): SocketIO.Namespace | void;
    write(...args: any[]): SocketIO.Namespace | void;
    clients(...args: any[]): SocketIO.Namespace | void;
    compress(...args: any[]): SocketIO.Namespace | void;
}
