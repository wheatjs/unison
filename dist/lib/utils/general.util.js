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
/**
 * @description Returns a list of the class methods.
 *
 * @export
 * @param {*} clazz
 * @returns {Array<any>}
 */
function ClassMethods(clazz) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(new clazz));
}
exports.ClassMethods = ClassMethods;
