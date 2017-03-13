"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Defines a Unison Component.
 *
 * @export
 * @param {IComponentDecorator} config - Component Configuration
 * @returns
 */
function Component(config) {
    return (target) => {
        Reflect.defineMetadata('unison:component', config, target);
    };
}
exports.Component = Component;
