import { IRouteDecorator } from "./route.interface";

/**
 * Defines a unison route.
 * 
 * @export
 * @param {IRouteDecorator} config 
 * @returns {*} 
 */
export function Route(config: IRouteDecorator): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('unison:route', config, target, propertyKey);
    };
}