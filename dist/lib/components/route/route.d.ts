/// <reference types="express" />
import { Application } from 'express';
/**
 * @description Registers application routes.
 *
 * @export
 * @class RouteRegister
 */
export declare class RouteRegister {
    private components;
    private injectables;
    private application;
    constructor(components: Array<any>, injectables: Object, application: Application);
    /**
     * @description - Registers application routes.
     *
     * @private
     *
     * @memberOf RouteRegister
     */
    private initialize();
    private logRoute(url, method);
}
