/**
 * Creates injectable dependencies
 *
 * @export
 * @class Injector
 */
export declare class Injector {
    private container;
    constructor(injectables: Array<any>);
    /**
     * Gets the injectable dependencies.
     *
     * @returns {Object}
     *
     * @memberOf Injector
     */
    getInjectables(): Object;
    /**
     * Resolves an injectable.
     *
     * @private
     * @param {*} injectable
     *
     * @memberOf Injector
     */
    private resolve(injectable);
}
