"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a unison view.
 *
 * @export
 * @param {IViewDecorator} config
 * @returns
 */
function Component(config) {
    return (target) => {
        Reflect.defineMetadata('unison:component', config, target);
    };
}
exports.Component = Component;
