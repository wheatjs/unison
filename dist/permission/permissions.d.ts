/// <reference types="express" />
import { Request, Response } from 'express';
export declare class Permissions {
    verify(request: Request, response: Response, permissions: Array<any>, injectables: Object): Promise<any>;
}
