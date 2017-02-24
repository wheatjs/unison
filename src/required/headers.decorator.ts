/**
 * Defines required route headers.
 * 
 * @export
 * @param {Array<string>} headers
 * @returns {*} 
 */
export function RequiredHeaders(headers: Array<string>): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('unison:required-headers', headers, target, propertyKey);
    };
}