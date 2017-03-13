![alt text](./assets/logo.svg "Unison Server Logo")

> Unison Server is still under development. API's are subject to change and is not guaranteed to be stable.

**Table of Contents**
* [About](#about)
* [Roadmap](#roadmap)
* [App](#app)
* [Components](#components)
    * [Routes](#routes)
        * [Permissions](#permissions)
        * [Required Headers](#required-headers)
        * [Required Body](#required-body)
        * [Required Query](#required-query)
    * [Sockets](#sockets)
        * [IO](#io)
        * [Socket](#socket)
* [Injectables (Dependency Injection)](#injectables)

* [Install](#install)
* [Contributing](#contributing)
* [License](#license)

## About
Unison allows you to easily create RESTful web services. It provides support for routes, sockets, and basic dependency injection. Unison makes use of [express](https://github.com/expressjs/express) and [socket.io](https://github.com/socketio/socket.io) along with many other libraries and would not be possible without them. Unison server is inspired by [Angular](https://github.com/angular/angular).

## Roadmap
* Add unit tests, failure is not an option... unless it is.
* Improve Dependency Injection, see [Issue #3](https://github.com/jacobclevenger/unison/issues/3)
* Add permissions for sockets.
* Add permissions to components for routes and sockets.

## App

To create a unison app, you will need to create a class and decorate it with the `@UnisonApp` decorator. You will then need to bootstrap the app using the `UnisonServer` class. When creating the server you will need to pass in a configuraiton that includes the `port` and `host`. In the furutre you will also enable `https` through this configuraiton.

In the `@UnisonApp` decorator you will pass application components into the `components` array and injectables into the `injectables` array.

````typescript
import { UnisonServer, UnisonApp } from 'unison-server';

@UnisonApp({
    
    // Register Components Here
    components: []

    // Register Injectables Here
    injectables: []

})
export class App {}

new UnisonServer({ host: 'localhost', port: 8080 }).bootstrap(App);
````


## Components

Components are a place where you can register routes and sockets. Components can also have injectable classes injected into them. To register components, export the class, then import the class into the main app file and add it to `components` array in the `@UnisonApp` decorator.

To create a component, decorate a class with the `@Component` decorator. In the configuration you can add configuration for the routes and sockets that are children of that component. Currently you can configure the `baseUrl` and `method` for routes. All children routes will extend the `baseUrl` and routes without defined methods will default to the method of the `method` property. Sockets currently have no configuration, but configuration for sockets may be added in the future.

````typescript
import { Component, Method } from 'unison-server';

@Component({ 
    routes: {
        baseUrl: '',
        method: Method.GET
    }, 
    sockets: {} 
})
export class AppComponent {}
````

### Routes
Routes must be defined inside of a `@Component`. Inside of a route configuration you can define the `route` and `method`. If a `routeUrl` is defined on the component, the route will extend the component route. If no method is defined, then the method defined on the component will be used. If no method is defined on the component, then the `GET` method will be used as a default.

To create a route, decorate a `@Component` method with the `@Route` decorator. When doing this, your method will recieve two different parameters, `request` and `response`. The `request` and `response` parameters are from express.

````typescript
import { Component, Route, Method } from 'unison-server';
import { Request, Response } from 'express';

@Component({ 
    routes: {
        baseUrl: '/api/users',
        method: Method.GET
    }, 
    sockets: {} 
})
export class AppComponent {

    constructor() {}

    @Route({ route: '/create', method: Method.POST })
    public createUser(request: Request, response: Response): Promise<any> {
        return Promise.resolve(request.json({ date: 'Your Data Here' }));
    }

    @Route({ route: '/get' })
    public getUser(request: Request, response: Response): Promise<any> {
        return Promise.resolve(request.json({ date: 'Your Data Here' }));
    }

}
````

#### Permissions

**Using Permissions**

Permissions act like guards for routes. You can define as many permissions as you want to a route using the `@Permissions` decorator. 

````typescript
import { Component, Route, Method, Permissions } from 'unison-server';
import { Request, Response } from 'express';

import { Authenticated } from '~/permissions/authenticated';

...

    @Permissions([Authenticated])
    @Route({ route: '/create', method: Method.POST })
    public createUser(request: Request, response: Response): Promise<any> {
        return Promise.resolve(request.json({ date: 'Your Data Here' }));
    }

...
````

**Creating Permissions**

To create a permission, you will need to create a class and decorate it with the `@Injectable` decorator. Then you will need to have it implement the `IPermission` interface. The `check` method will be where you will implement your permission. It will receive two different parameters, `request` and `response`. The `request` and `response` parameters are from express. It should return either a boolen or a promise with a boolean. The `reject` method will be called when the permissions returns a rejection.

````typescript
import { Injectable, IPermission } from 'unison-server';
import { Request, Response } from 'express';

@Injectable()
export class Authenticated implements IPermission {

    public check(request: Request, response: Response): boolean || Promise<boolean> {
        if ('some permissions check here')
            return Promise.resolve(true);
        else
            return Promise.reject();
    }

    public reject(request: Request, response: Response): Response {
        return response.send({
            success: false,
            error: 'Failed To Authenticate'
        });
    }

}
````

#### Required Headers

The `@RequiredHeaders` decorator can be applied to routes. It will ensure that routes have certian headers otherwise it will reject the requset and return and error as a response.

````typescript
import { Route, RequiredHeaders } from 'unison-server';

...

    @RequiredHeaders(['username', 'password'])
    @Route({ route: '/create', method: Method.POST })
    public createUser(request: Request, response: Response): Promise<any> {
        return Promise.resolve(request.json({ date: 'Your Data Here' }));
    }

...
````

#### Required Body

The `@RequiredBody` decorator can be applied to routes. It will ensure that routes have certian body parameters otherwise it will reject the requset and return and error as a response.

````typescript
import { Route, RequiredBody } from 'unison-server';

...

    @RequiredBody(['username', 'password'])
    @Route({ route: '/create', method: Method.POST })
    public createUser(request: Request, response: Response): Promise<any> {
        return Promise.resolve(request.json({ date: 'Your Data Here' }));
    }

...
````

#### Required Query

The `@RequiredQuery` decorator can be applied to routes. It will ensure that routes have certian query parameters otherwise it will reject the requset and return and error as a response.

````typescript
import { Route, RequiredQuery } from 'unison-server';

...

    @RequiredQuery(['username', 'password'])
    @Route({ route: '/create', method: Method.POST })
    public createUser(request: Request, response: Response): Promise<any> {
        return Promise.resolve(request.json({ date: 'Your Data Here' }));
    }

...
````

### Sockets
Sockets in unison use [socket.io](http://socket.io). Socket support is currently in early stages and many bugs may be present. Sockets must be part of a component.

#### IO
The IO decorator uses the `io.on(event, callback)` method. Below is an example of the `@IO(event)` decorator. It is called whenever a new connection to the socket is created.

````typescript
import { IO } from 'unison-server';

...

    @IO('connection')
    public onConnection(io: SocketIO.Server, socket: SocketIO.Socket): void {
        // Handle New User Connection
    }

...

````

#### Socket
The Socket decorator uses the socket.on method. Below is an example of the `@Socket` decorator. It is called whenever a message with the name of `hello` is sent from a connection.

````typescript
import { Socket } from 'unison-server';

...

    @Socket('hello')
    public onHello(io: SocketIO.Server, socket: SocketIO.Socket, data: any): void {
        // Handle the socket 'hello` message.
    }

...

````


## Injectables
Unison server provides a very basic implementation of dependency injection. To create an injectable, decorator a class with the `@Injectable()` decorator. Then you will need to register it in the `injectables` array inside of the `@UnisonApp` decorator.

**Creating and Injectable**

````typescript
import { Injectable } from 'unison-server';

@Injectable()
export class SomeService {

}
````

**Using Injectables**
You can use an injectable in components or other injectables. It probably isn't a good idea to make a two injectables depend on each other though, it probably won't go well. To have classes injected, you will need to add them as parameter arguments and include the type of the class you want to include.

````typescript
import { Injectable, Component } from 'unison-server';

@Injectable()
export class SomeService {

    constructor(
        private someOtherService: SomeOtherService
    ) {}

}

@Component(...)
export class SomeComponent {

    constructor(
        private someService: SomeService
    ) {}
    
}

````


## Install
````bash
npm install --save unison-server

or

yarn add unison-server
````

## Contributing
If you would like to help, feel free to create issues, create pull requests, or suggest future improvements that could be made.

## License

MIT, see [LICENSE file](LICENSE).