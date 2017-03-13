"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines required route query params.
 *
 * @export
 * @param {IRouteDecorator} config
 * @returns {*}
 */
function RequiredQuery(params) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('unison:required-query', params, target, propertyKey);
    };
}
exports.RequiredQuery = RequiredQuery;
