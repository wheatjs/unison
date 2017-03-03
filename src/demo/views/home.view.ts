import { View, Route, Method, Permissions, RequiredQuery, RequiredHeaders, RequiredBody } from '../../index';
import { Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { Authenticated } from '../permissions/authenticated.permission';

@View({ base: '/api/home' })
export class HomeView {

    constructor(
        private userService: UserService
    ) { }

    @Permissions([Authenticated])
    @RequiredBody(['username'])
    @Route({ route: '/list', method: Method.POST })
    public list(req: Request, res: Response): Response {
        return res.send({
            success: true,
            message: this.userService.getUser()
        });
    }

}