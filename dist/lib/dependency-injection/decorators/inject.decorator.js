"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an injectable class.
 *
 * @export
 * @returns
 */
function Inject(injectable) {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata('unison:as', injectable, target, propertyKey);
    };
}
exports.Inject = Inject;
