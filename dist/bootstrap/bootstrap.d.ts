import 'reflect-metadata';
import { IServerConfig } from "../server/server-config.interface";
/**
 * Unison Web Server
 *
 * @export
 * @class UnisonServer
 */
export declare class UnisonServer {
    private serverConfig;
    private application;
    private metadata;
    private injectables;
    constructor(serverConfig: IServerConfig);
    /**
     * Bootstraps a Unison App.
     *
     * @param {Function} unisonApp
     *
     * @memberOf UnisonServer
     */
    bootstrap(unisonApp: Function): void;
}
