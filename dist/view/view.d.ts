/// <reference types="express" />
import { Application } from 'express';
/**
 * @description Registers application views.
 *
 * @export
 * @class ViewRegister
 */
export declare class ViewRegister {
    private views;
    private injectables;
    private application;
    private registered;
    constructor(views: Array<any>, injectables: Object, application: Application);
    private register(view);
    private logRoute(url, method);
}
