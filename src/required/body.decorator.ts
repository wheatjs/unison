/**
 * Defines required route body parameters.
 * 
 * @export
 * @param {Array<string>} params 
 * @returns {*} 
 */
export function RequiredBody(params: Array<string>): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('unison:required-body', params, target, propertyKey);
    };
}