"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines required route headers.
 *
 * @export
 * @param {Array<string>} headers
 * @returns {*}
 */
function RequiredHeaders(headers) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('unison:required-headers', headers, target, propertyKey);
    };
}
exports.RequiredHeaders = RequiredHeaders;
