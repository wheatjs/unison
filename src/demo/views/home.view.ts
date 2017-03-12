import { Component, Route, Method, Permissions, RequiredQuery, RequiredHeaders, RequiredBody, Socket } from '../../index';
import { Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { Authenticated, Authenticated2 } from '../permissions/authenticated.permission';

@Component({ base: '/api/home' })
export class HomeComponent {

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

    @Socket('hello')
    public HelloWorld(io: SocketIO.Server, socket: SocketIO.Socket, data: any): void {
        console.log('testing');
    }

    @Socket('new')
    public connect(io: SocketIO.Server, socket: SocketIO.Socket, data: any): void {
        socket.emit('established', 'Connection was established');
        io.emit('established', 'Hello From IO');
    }

}