import { View, Route, Method, Permissions } from '../../index';
import { Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { Authenticated } from '../permissions/authenticated.permission';

@View({ base: '/api/home' })
export class HomeView {

    constructor(
        private userService: UserService
    ) { }

    @Permissions([Authenticated])
    @Route({ route: '/list', method: Method.GET })
    public list(req: Request, res: Response): Response {
        return res.send({
            success: true,
            message: this.userService.getUser()
        });
    }

}