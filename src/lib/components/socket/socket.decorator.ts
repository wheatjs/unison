/**
 * @description Defines a socket listener.
 * 
 * @export
 * @param {string} command 
 * @returns {*} 
 */
export function Socket(command: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('unison:socket', command, target, propertyKey);
    };
}

export function IO(event: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('unison:io', event, target, propertyKey);
    };
}

export abstract class SocketIOServer {
    engine: { ws: any; };
    nsps: { [namespace: string]: SocketIO.Namespace; };
    sockets: SocketIO.Namespace;
    json: SocketIO.Server;
    checkRequest(req: any, fn: (err: any, success: boolean) => void): void {
        throw new Error('Method not implemented.');
    }

    serveClient(): boolean;
    serveClient(v: boolean): SocketIO.Server;
    serveClient(v?: any): boolean | SocketIO.Server | void {}

    path(): string;
    path(v: string): SocketIO.Server;
    path(v?: any): string | SocketIO.Server | void {}

    adapter();
    adapter(v: any): SocketIO.Server;
    adapter(v?: any): SocketIO.Server | void {}

    origins(): string;
    origins(v: string): SocketIO.Server;
    origins(v?: any): string | SocketIO.Server | void {}

    attach(srv: any, opts?: SocketIO.ServerOptions): SocketIO.Server;
    attach(port: number, opts?: SocketIO.ServerOptions): SocketIO.Server;
    attach(srv: any, opts?: any): SocketIO.Server | void {}

    listen(srv: any, opts?: SocketIO.ServerOptions): SocketIO.Server;
    listen(port: number, opts?: SocketIO.ServerOptions): SocketIO.Server;
    listen(srv: any, opts?: any): SocketIO.Server | void {}

    bind(srv: any): SocketIO.Server | void {}
    onconnection(socket: any): SocketIO.Server | void{}
    of(nsp: string): SocketIO.Namespace | void {}
    
    close(fn?: () => void): void {}
    on(event: "connection", listener: (socket: SocketIO.Socket) => void): SocketIO.Namespace;
    on(event: "connect", listener: (socket: SocketIO.Socket) => void): SocketIO.Namespace;
    on(event: string, listener: Function): SocketIO.Namespace;
    on(event: any, listener: any): SocketIO.Namespace | void {}

    to(room: string): SocketIO.Namespace | void {}

    in(room: string): SocketIO.Namespace | void {}

    use(fn: (socket: SocketIO.Socket, fn: (err?: any) => void) => void): SocketIO.Namespace | void {}
    
    emit(event: string, ...args: any[]): SocketIO.Namespace | void {}
    
    send(...args: any[]): SocketIO.Namespace | void {}
    
    write(...args: any[]): SocketIO.Namespace | void {}
    
    clients(...args: any[]): SocketIO.Namespace | void {}
    
    compress(...args: any[]): SocketIO.Namespace | void {}

};
