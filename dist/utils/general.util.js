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
    return new clazz().constructor.name.toString();
}
exports.ClassName = ClassName;
