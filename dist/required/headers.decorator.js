"use strict";
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
