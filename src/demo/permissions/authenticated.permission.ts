import { IPermission, Injectable } from '../../index';
import { Request, Response } from 'express';

@Injectable()
export class Authenticated implements IPermission {

    constructor() { }

    public check(req: Request, res: Response): boolean {
        return req.param('auth') === '123';
    }

    public reject(req: Request, res: Response): Response {
        return res.send({
            success: false,
            error: 'Failed To Authenticate'
        });
    }

}