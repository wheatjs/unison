import { Application, Request, Response } from 'express';
import * as chalk from 'chalk';

import { IComponentDecorator } from '../index';
import { ClassMethods, ClassName, GenerateURI } from '../../utils';
import { IRouteDecorator, RouteRequired, PermissionsHandler } from "./index";
import { Status, Method } from "../../http/index";

/**
 * @description Registers application routes.
 * 
 * @export
 * @class RouteRegister
 */
export class RouteRegister {

    constructor(
        private components: Array<any>,
        private injectables: Object,
        private application: Application
    ) {
        this.initialize();
    }


    /**
     * @description - Registers application routes.
     * 
     * @private
     * 
     * @memberOf RouteRegister
     */
    private initialize(): void {
        for (let component of this.components) {

            // Retrive the component metadata. This will be used to get the
            // component configuration for things like "routeUrl" and "method".
            let metadata: IComponentDecorator
                = Reflect.getMetadata('unison:component', component);

            for (let method of ClassMethods(component)) {
                if (Reflect.hasMetadata('unison:route', new component(), method)) {

                    // Get the route metadata.
                    let routeMetadata: IRouteDecorator
                        = Reflect.getMetadata('unison:route', new component(), method);

                    let permissions = [];

                    // Get the route permissions.
                    let routePermissions: Array<any>
                        = Reflect.getMetadata('unison:permissions', new component(), method);

                    if (metadata.routes !== undefined && metadata.routes.permissions !== undefined)
                        permissions.push(...metadata.routes.permissions);

                    if (routePermissions !== undefined)
                        permissions.push(...routePermissions);
                        
                    // Generate the method that the route will use.
                    let defaultMethod
                        = (routeMetadata.method || metadata.routes.method || 'get');

                    // Generate the uri that the route will use.
                    let uri  = GenerateURI(metadata.routes.baseUrl || '', routeMetadata.route);

                    // Register express route.
                    this.application[defaultMethod](uri, (request: Request, response: Response) => {

                        // Check if any of the required params are missing.
                        let required = new RouteRequired().verify(request,
                            Reflect.getMetadata('unison:required-headers', new component(), method),
                            Reflect.getMetadata('unison:required-body', new component(), method),
                            Reflect.getMetadata('unison:required-query', new component(), method));

                        if (required.length > 0)
                            return response
                                .status(Status.ClientError.BadRequest)
                                .json(required);

                        new PermissionsHandler()
                            .verify(request, response, permissions, this.injectables)
                            .then(success => {
                                let dependencies = [];

                                if (Reflect.getMetadata('design:paramtypes', component) !== undefined &&
                                    Reflect.getMetadata('design:paramtypes', component).length > 0) {
                                    for (let dependency of Reflect.getMetadata('design:paramtypes', component))
                                        dependencies.push(this.injectables[ClassName(dependency)]);
                                    }

                                new component(...dependencies)[method](request, response)
                                    .catch(error => { });
                            })
                            .catch(error => {});

                    });

                    this.logRoute(uri, defaultMethod);

                }
            }
        }
    }

    private logRoute(url: string, method: any) {
        switch (method) {
            case Method.GET:
                console.log(`${chalk.green(method.toUpperCase())} - ${chalk.italic(url)}`);
                break;
            case Method.POST:
                console.log(`${chalk.cyan(method.toUpperCase())} - ${chalk.italic(url)}`);
                break;
            case Method.DELETE:
                console.log(`${chalk.red(method.toUpperCase())} - ${chalk.italic(url)}`);
                break;
            default:
                console.log(`${chalk.black(method.toUpperCase())} - ${chalk.italic(url)}`);
                break;
        }
    }

}