import { SocketIOServer } from '../../index';
import { APIService } from './api.service';
export declare class UserService {
    private apiService;
    private io;
    constructor(apiService: APIService, io: SocketIOServer);
    getUser(): any;
}
