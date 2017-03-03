import { IPermission, Injectable } from '../../index';
import { Request, Response } from 'express';

@Injectable()
export class Authenticated implements IPermission {

    constructor() { }

    public check(req: Request, res: Response): boolean | Promise<boolean> {
        // return true;
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