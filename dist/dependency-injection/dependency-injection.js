"use strict";
const general_util_1 = require("../utils/general.util");
/**
 * Creates injectable dependencies
 *
 * @export
 * @class Injector
 */
class Injector {
    constructor(injectables) {
        this.container = {};
        for (let injectable of injectables)
            this.resolve(injectable);
        console.log(this.container);
    }
    /**
     * Gets the injectable dependencies.
     *
     * @returns {Object}
     *
     * @memberOf Injector
     */
    getInjectables() {
        return this.container;
    }
    /**
     * Resolves an injectable.
     *
     * @private
     * @param {*} injectable
     *
     * @memberOf Injector
     */
    resolve(injectable) {
        if (Reflect.getMetadata('design:paramtypes', injectable) !== undefined &&
            Reflect.getMetadata('design:paramtypes', injectable).length > 0) {
            let dependencies = Reflect.getMetadata('design:paramtypes', injectable);
            for (let dependency of dependencies)
                this.resolve(dependency);
            if (this.container[general_util_1.ClassName(injectable)] === undefined) {
                let construct = [];
                for (let dependency of dependencies)
                    construct.push(this.container[general_util_1.ClassName(dependency)]);
                this.container[general_util_1.ClassName(injectable)] = new injectable(...construct);
            }
        }
        else {
            if (this.container[general_util_1.ClassName(injectable)] === undefined)
                this.container[general_util_1.ClassName(injectable)] = new injectable();
        }
    }
}
exports.Injector = Injector;
