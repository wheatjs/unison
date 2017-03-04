import { View, Route, Method, Permissions, RequiredQuery, RequiredHeaders, RequiredBody } from '../../index';
import { Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { Authenticated, Authenticated2 } from '../permissions/authenticated.permission';

@View({ base: '/api/home' })
export class HomeView {

    constructor(
        private userService: UserService
    ) { }

    @Route({ route: '/list', method: Method.POST })
    @Permissions([Authenticated])
    public list(req: Request, res: Response): Response {
        return res.send({
            success: true,
            message: this.userService.getUser()
        });
    }

    @Permissions([Authenticated, Authenticated2])
    @RequiredBody(['username'])
    @Route({ route: '/create', method: Method.POST })
    public create(req: Request, res: Response): Response {
        return res.send({
            success: true,
            message: this.userService.getUser()
        });
    }

}