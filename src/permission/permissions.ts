import { Request, Response } from 'express';

import { ClassName } from '../utils/general.util';

export class Permissions {

    public async verify(request: Request, response: Response, permissions: Array<any>, injectables: Object): Promise<any> {
        if (permissions !== undefined && permissions.length > 0) {
            for (let permission of permissions) {
                try {
                    if (!await injectables[ClassName(permission)]['check'](request, response)) {
                        injectables[ClassName(permission)]['reject'](request, response)
                        return Promise.reject(false);
                    }
                } catch (error) {
                    injectables[ClassName(permission)]['reject'](request, response)
                    return Promise.reject(false);
                }
            }
        }
        return Promise.resolve(true);
    }

}