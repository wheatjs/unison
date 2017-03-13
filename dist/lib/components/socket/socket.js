"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/**
 * @description Registers Application Sockets
 *
 * @export
 * @class SocketRegister
 */
class SocketRegister {
    constructor(components, injectables, io) {
        this.components = components;
        this.injectables = injectables;
        this.io = io;
        this.commandRegister = [];
        this.ioRegister = [];
        this.initialize();
        this.initializeIO();
        this.register();
    }
    initialize() {
        for (let component of this.components) {
            let metadata = Reflect.getMetadata('unison:component', component);
            for (let method of utils_1.ClassMethods(component)) {
                if (Reflect.hasMetadata('unison:socket', new component(), method)) {
                    let socketMetadata = Reflect.getMetadata('unison:socket', new component(), method);
                    if (Reflect.hasMetadata('unison:route', new component(), method))
                        throw new Error(`Decorator Conflict Error: "${method}()" has the "@Route" and "@Socket" decorators, but can only have one.`);
                    let dependencies = [];
                    if (Reflect.getMetadata('design:paramtypes', component) !== undefined &&
                        Reflect.getMetadata('design:paramtypes', component).length > 0) {
                        for (let dependency of Reflect.getMetadata('design:paramtypes', component))
                            dependencies.push(this.injectables[utils_1.ClassName(dependency)]);
                    }
                    this.commandRegister.push({
                        name: socketMetadata,
                        method: new component(...dependencies)[method]
                    });
                }
            }
        }
    }
    initializeIO() {
        for (let component of this.components) {
            let metadata = Reflect.getMetadata('unison:component', component);
            for (let method of utils_1.ClassMethods(component)) {
                if (Reflect.hasMetadata('unison:io', new component(), method)) {
                    let socketMetadata = Reflect.getMetadata('unison:io', new component(), method);
                    if (Reflect.hasMetadata('unison:route', new component(), method))
                        throw new Error(`Decorator Conflict Error: "${method}()" has the "@Route" and "@Socket" decorators, but can only have one.`);
                    if (Reflect.hasMetadata('unison:socket', new component(), method))
                        throw new Error(`Decorator Conflict Error: "${method}()" has the "@IO" and "@Socket" decorators, but can only have one.`);
                    let dependencies = [];
                    if (Reflect.getMetadata('design:paramtypes', component) !== undefined &&
                        Reflect.getMetadata('design:paramtypes', component).length > 0) {
                        for (let dependency of Reflect.getMetadata('design:paramtypes', component))
                            dependencies.push(this.injectables[utils_1.ClassName(dependency)]);
                    }
                    this.ioRegister.push({
                        name: socketMetadata,
                        method: new component(...dependencies)[method]
                    });
                }
            }
        }
    }
    register() {
        for (let io of this.ioRegister) {
            this.io.on(io.name, (socket) => {
                io.method(this.io, socket);
            });
        }
        this.io.on('connection', (socket) => {
            for (let command of this.commandRegister) {
                socket.on(command.name, (data) => {
                    command.method(this.io, socket, data);
                });
            }
        });
    }
}
exports.SocketRegister = SocketRegister;
function HasName(connections, name) {
    for (let io of connections)
        if (io.name == name)
            return true;
    return false;
}
