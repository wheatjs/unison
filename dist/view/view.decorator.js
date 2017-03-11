"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a unison view.
 *
 * @export
 * @param {IViewDecorator} config
 * @returns
 */
function View(config) {
    return (target) => {
        Reflect.defineMetadata('unison:view', config, target);
    };
}
exports.View = View;
