"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_util_1 = require("../utils/general.util");
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
        this.initialize();
        this.register();
        console.log(this.commandRegister);
    }
    initialize() {
        for (let component of this.components) {
            let metadata = Reflect.getMetadata('unison:component', component);
            for (let method of Object.getOwnPropertyNames(Object.getPrototypeOf(new component))) {
                if (Reflect.hasMetadata('unison:socket', new component(), method)) {
                    let socketMetadata = Reflect.getMetadata('unison:socket', new component(), method);
                    let dependencies = [];
                    if (Reflect.getMetadata('design:paramtypes', component) !== undefined &&
                        Reflect.getMetadata('design:paramtypes', component).length > 0) {
                        for (let dependency of Reflect.getMetadata('design:paramtypes', component))
                            dependencies.push(this.injectables[general_util_1.ClassName(dependency)]);
                    }
                    this.commandRegister.push({
                        name: socketMetadata,
                        method: new component(...dependencies)[method]
                    });
                }
            }
        }
    }
    register() {
        this.io.on('connection', (socket) => {
            for (let command of this.commandRegister) {
                socket.on(command.name, (data) => {
                    console.log(`Running Command ${command.name}`);
                    command.method(this.io, socket, data);
                });
                console.log(`Registered New Command: ${command.name}`);
            }
        });
    }
}
exports.SocketRegister = SocketRegister;
