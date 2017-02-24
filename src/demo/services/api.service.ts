import { Injectable } from '../../index';

@Injectable()
export class APIService {

    public test(param: any) {
        return param;
    }

}