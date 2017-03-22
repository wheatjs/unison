/// <reference types="express" />
/// <reference types="socket.io" />
import { SocketIOServer } from '../../index';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
export declare class HomeComponent {
    private userService;
    private io;
    constructor(userService: UserService, io: SocketIOServer);
    list(req: Request, res: Response): Response;
    create(req: Request, res: Response): Response;
    connection(io: SocketIO.Server, socket: SocketIO.Socket): void;
    HelloWorld(io: SocketIO.Server, socket: SocketIO.Socket, data: any): void;
    connect(io: SocketIO.Server, socket: SocketIO.Socket, data: any): void;
}
