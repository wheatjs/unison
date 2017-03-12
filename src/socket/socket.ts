import { ClassName } from "../utils/general.util";

/**
 * @description Registers Application Sockets
 * 
 * @export
 * @class SocketRegister
 */
export class SocketRegister {

    private commandRegister: Array<any> = [];

    constructor(
        private components: Array<any>,
        private injectables: Object,
        private io: SocketIO.Server) {

            this.initialize();
            this.register();
            console.log(this.commandRegister);

        }
    

    private initialize(): void {
        for (let component of this.components) {

            let metadata = Reflect.getMetadata('unison:component', component);

            for (let method of Object.getOwnPropertyNames(Object.getPrototypeOf(new component))) {
                if (Reflect.hasMetadata('unison:socket', new component(), method)) {
                    let socketMetadata: string = Reflect.getMetadata('unison:socket', new component(), method); 
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

    private register(): void {
        this.io.on('connection', (socket: SocketIO.Socket) => {
            for (let command of this.commandRegister) {

                socket.on(command.name, (data) => {
                    console.log(`Running Command ${command.name}`);
                    command.method(this.io, socket, data);
                });

                console.log(`Registered New Command: ${command.name}`)

            }
        });
    }

}
