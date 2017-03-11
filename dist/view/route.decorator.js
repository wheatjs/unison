"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a unison route.
 *
 * @export
 * @param {IRouteDecorator} config
 * @returns {*}
 */
function Route(config) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('unison:route', config, target, propertyKey);
    };
}
exports.Route = Route;
