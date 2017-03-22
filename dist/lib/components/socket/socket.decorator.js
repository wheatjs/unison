"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Defines a socket listener.
 *
 * @export
 * @param {string} command
 * @returns {*}
 */
function Socket(command) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('unison:socket', command, target, propertyKey);
    };
}
exports.Socket = Socket;
function IO(event) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('unison:io', event, target, propertyKey);
    };
}
exports.IO = IO;
class SocketIOServer {
    checkRequest(req, fn) {
        throw new Error('Method not implemented.');
    }
    serveClient(v) { }
    path(v) { }
    adapter(v) { }
    origins(v) { }
    attach(srv, opts) { }
    listen(srv, opts) { }
    bind(srv) { }
    onconnection(socket) { }
    of(nsp) { }
    close(fn) { }
    on(event, listener) { }
    to(room) { }
    in(room) { }
    use(fn) { }
    emit(event, ...args) { }
    send(...args) { }
    write(...args) { }
    clients(...args) { }
    compress(...args) { }
}
exports.SocketIOServer = SocketIOServer;
;
