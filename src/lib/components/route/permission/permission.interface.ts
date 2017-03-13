import { Request, Response } from 'express';

export interface IPermission {
    check(request: Request, response: Response): boolean | Promise<boolean>;
    reject(request: Request, response: Response): void;
}