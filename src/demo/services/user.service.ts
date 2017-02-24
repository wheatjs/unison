import { Injectable } from '../../index';

import { APIService } from './api.service';

@Injectable()
export class UserService {

    constructor(
        private apiService: APIService
    ) { }

    public getUser() {
        return this.apiService.test('HELLO WORLD');
    }

}