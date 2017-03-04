import { IPermission, Injectable } from '../../index';
import { Request, Response } from 'express';

@Injectable()
export class Authenticated implements IPermission {

    constructor() { }

    public check(req: Request, res: Response): boolean | Promise<boolean> {
        return new Promise((resolve, reject) => {
            return resolve(true);
        });
    }

    public reject(req: Request, res: Response): Response {
        return res.send({
            success: false,
            error: 'Failed To Authenticate'
        });
    }

}

@Injectable()
export class Authenticated2 implements IPermission {

    constructor() { }

    public check(req: Request, res: Response): boolean | Promise<boolean> {
        return new Promise((resolve, reject) => {
            return resolve(false);
        });
    }

    public reject(req: Request, res: Response): Response {
        return res.send({
            success: false,
            error: 'Failed To Authenticate 2'
        });
    }

}