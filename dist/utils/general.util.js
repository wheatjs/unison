"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the class name from a class.
 *
 * @export
 * @param {Function} clazz
 * @returns {string}
 */
function ClassName(clazz) {
    return clazz.toString().split('class')[1].split('{')[0].trim();
}
exports.ClassName = ClassName;
