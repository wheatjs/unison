import { Injectable, SocketIOServer } from '../../index';
import { APIService } from './api.service';

@Injectable()
export class UserService {

    constructor(
        private apiService: APIService,
        private io: SocketIOServer
    ) { }

    public getUser() {
        this.io.emit('new post');
        return this.apiService.test('HELLO WORLD');
    }

}