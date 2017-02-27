# Unison Server
Unison server is a small node express web server written in Typescirpt. It provides basic features like dependency injection and route permissions.

> Note: This is a very early version and has not been tested. Use at your own risk.

## Basic Usage

> npm install --save unison-server

or

> yarn add unison-server

### Creating a basic app.

```` typescript
import { UnisonApp, UnisonServer } from 'unison-server';

import { HomeView } from '~/views/home.view';
import { APIService } from '~/services/api.service';
import { UserService } from '~/services/user.service';
import { Authenticated } from '~/permissions/authenticated.permission';

@UnisonApp({

    views: [
        HomeView
    ],

    services: [
        APIService,
        UserService,
        Authenticated
    ]

})
class App { }

new UnisonServer({ host: 'localhost', port: 8080 }).bootstrap(App);
````

### Creating a service
```` typescript
import { Injectable } from 'unison-server';

import { APIService } from './api.service';

@Injectable()
export class UserService {

    constructor(
        private apiService: APIService
    ) { }

    public getUser(): string {
        return this.apiService.get('user');
    }

}
````

### Creating a view
```` typescript
import { View, Route, Method, Permissions } from 'unison-server';
import { Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { Authenticated } from '../permissions/authenticated.permission';

@View({ base: '/api/home' })
export class HomeView {

    constructor(
        private userService: UserService
    ) { }

    @Permissions([Authenticated])
    @Route({ route: '/list', method: Method.GET })
    public list(req: Request, res: Response): Response {
        return res.send({
            success: true,
            message: this.userService.getUser()
        });
    }

}
````

### Creating a permission
```` typescript
import { IPermission, Injectable } from 'unison-server';
import { Request, Response } from 'express';

@Injectable()
export class Authenticated implements IPermission {

    constructor() { }

    public check(req: Request, res: Response): boolean {
        return req.param('auth') === '123';
    }

    public reject(req: Request, res: Response): Response {
        return res.send({
            success: false,
            error: 'Failed To Authenticate'
        });
    }

}
````

### Other Useful Decorators

#### @RequiredHeaders()
Will reject any request that doesn't have the required headers present.
````
...
@RequiredHeaders(['authorization'])
@Route({...})
public method(): void {}
...

````

#### @RequiredBody()
>Note this only works for first level parameters. In future updates support for deeper levels will be added.

Will reject any request that doesn't have the required body properties present.
````
...
@RequiredBody(['username', 'email'])
@Route({...})
public method(): void {}
...

````

#### @RequiredQuery()
Will reject any request that doesn't have the required query parameters present.
````
...
@RequiredQuery(['page', 'limit'])
@Route({...})
public method(): void {}
...

````




## Want to help?
If you would like to help, feel free to create issues, create pull requests, or suggest future improvements that could be made.