/// <reference types="express" />
/// <reference types="socket.io" />
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
export declare class HomeComponent {
    private userService;
    constructor(userService: UserService);
    list(req: Request, res: Response): Response;
    create(req: Request, res: Response): Response;
    connection(io: SocketIO.Server, socket: SocketIO.Socket): void;
    HelloWorld(io: SocketIO.Server, socket: SocketIO.Socket, data: any): void;
    connect(io: SocketIO.Server, socket: SocketIO.Socket, data: any): void;
}
