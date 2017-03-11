"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines required route body parameters.
 *
 * @export
 * @param {Array<string>} params
 * @returns {*}
 */
function RequiredBody(params) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('unison:required-body', params, target, propertyKey);
    };
}
exports.RequiredBody = RequiredBody;
