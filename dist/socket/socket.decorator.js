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
