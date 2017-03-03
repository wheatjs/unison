import { Observable } from 'rxjs';
import { Request, Response } from 'express';

export interface IPermission {
    check(request: Request, response: Response): boolean | Observable<boolean> | Promise<boolean>;
    reject(request: Request, response: Response): void;
}