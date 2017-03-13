/**
 * Defines required route query params.
 * 
 * @export
 * @param {IRouteDecorator} config 
 * @returns {*} 
 */
export function RequiredQuery(params: Array<string>): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('unison:required-query', params, target, propertyKey);
    };
}