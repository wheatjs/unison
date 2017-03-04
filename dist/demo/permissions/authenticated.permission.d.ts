/// <reference types="express" />
import { IPermission } from '../../index';
import { Request, Response } from 'express';
export declare class Authenticated implements IPermission {
    constructor();
    check(req: Request, res: Response): boolean | Promise<boolean>;
    reject(req: Request, res: Response): Response;
}
export declare class Authenticated2 implements IPermission {
    constructor();
    check(req: Request, res: Response): boolean | Promise<boolean>;
    reject(req: Request, res: Response): Response;
}
