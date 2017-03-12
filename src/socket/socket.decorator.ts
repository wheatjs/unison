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