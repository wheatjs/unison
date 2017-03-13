import { ClassName, ClassMethods } from '../../utils';

/**
 * @description Registers Application Sockets
 * 
 * @export
 * @class SocketRegister
 */
export class SocketRegister {

    private commandRegister: Array<any> = [];
    private ioRegister: Array<any> = [];

    constructor(
        private components: Array<any>,
        private injectables: Object,
        private io: SocketIO.Server) {

            this.initialize();
            this.initializeIO();
            this.register();

        }
    

    private initialize(): void {
        for (let component of this.components) {

            let metadata = Reflect.getMetadata('unison:component', component);

            for (let method of ClassMethods(component)) {
                if (Reflect.hasMetadata('unison:socket', new component(), method)) {
                    let socketMetadata: string = Reflect.getMetadata('unison:socket', new component(), method); 

                    if (Reflect.hasMetadata('unison:route', new component(), method))
                        throw new Error(`Decorator Conflict Error: "${method}()" has the "@Route" and "@Socket" decorators, but can only have one.`)

                    let dependencies = [];

                    if (Reflect.getMetadata('design:paramtypes', component) !== undefined && 
                        Reflect.getMetadata('design:paramtypes', component).length > 0) {

                        for (let dependency of Reflect.getMetadata('design:paramtypes', component))
                            dependencies.push(this.injectables[ClassName(dependency)]);
                    }

                    this.commandRegister.push({
                        name: socketMetadata,
                        method: new component(...dependencies)[method]
                    });
                }
            }
        }
    }

    private initializeIO(): void {
        for (let component of this.components) {

            let metadata = Reflect.getMetadata('unison:component', component);

            for (let method of ClassMethods(component)) {
                if (Reflect.hasMetadata('unison:io', new component(), method)) {
                    let socketMetadata: string = Reflect.getMetadata('unison:io', new component(), method); 

                    if (Reflect.hasMetadata('unison:route', new component(), method))
                        throw new Error(`Decorator Conflict Error: "${method}()" has the "@Route" and "@Socket" decorators, but can only have one.`)

                    if (Reflect.hasMetadata('unison:socket', new component(), method))
                        throw new Error(`Decorator Conflict Error: "${method}()" has the "@IO" and "@Socket" decorators, but can only have one.`)

                    let dependencies = [];

                    if (Reflect.getMetadata('design:paramtypes', component) !== undefined && 
                        Reflect.getMetadata('design:paramtypes', component).length > 0) {

                        for (let dependency of Reflect.getMetadata('design:paramtypes', component))
                            dependencies.push(this.injectables[ClassName(dependency)]);
                    }

                    this.ioRegister.push({
                        name: socketMetadata,
                        method: new component(...dependencies)[method]
                    });
                }
            }
        }
    }

    private register(): void {
        for (let io of this.ioRegister) {
            this.io.on(io.name, (socket: SocketIO.Socket) => {
                io.method(this.io, socket);
            });
        }

        this.io.on('connection', (socket: SocketIO.Socket) => {
            for (let command of this.commandRegister) {
                socket.on(command.name, (data) => {
                    command.method(this.io, socket, data);
                });
            }
        });
    }

}

function HasName(connections, name): boolean {
    for (let io of connections)
        if (io.name == name) return true;

    return false;
}