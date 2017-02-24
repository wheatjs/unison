/// <reference types="express" />
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
export declare class HomeView {
    private userService;
    constructor(userService: UserService);
    list(req: Request, res: Response): Response;
}
