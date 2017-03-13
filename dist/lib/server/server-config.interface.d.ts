/// <reference types="node" />
import * as https from 'https';
export interface IServerConfig {
    host: string;
    port: number;
    https?: {
        enabled: boolean;
        options: https.ServerOptions;
    };
}
