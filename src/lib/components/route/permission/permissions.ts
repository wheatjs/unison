import { Request, Response } from 'express';

import { ClassName } from '../../../utils';

export class PermissionsHandler {

    public async verify(request: Request, response: Response, permissions: Array<any>, injectables: Object): Promise<any> {        
        if (permissions !== undefined && permissions.length > 0) {
            for (let permission of permissions) {
                try {
                    let res = await injectables[ClassName(permission)]['check'](request, response);

                    if (res === false)
                        throw new Error('Rejected');

                } catch (error) {
                    injectables[ClassName(permission)]['reject'](request, response);
                    return Promise.reject(error);
                }
            }
        }
        return Promise.resolve();
    }

}