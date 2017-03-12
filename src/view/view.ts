import { Application, Request, Response } from 'express';
import * as chalk from 'chalk';

import { ClassName } from '../utils/general.util';
import { IViewDecorator } from './view.interface';
import { IRouteDecorator } from "./route.interface";
import { GenerateURI } from "../utils/view.util";
import { MethodMap, Method } from "./method.enum";
import { RequiredBody } from '../required/body.decorator';
import { RequiredHeaders } from '../required/headers.decorator';
import { RequiredQuery } from '../required/query.decorator';
import { Required } from '../required/required';
import { Permissions } from "../permission/permissions";

/**
 * @description Registers application views.
 * 
 * @export
 * @class ViewRegister
 */
export class ViewRegister {

    private registered: number = 0;

    constructor(
        private views: Array<any>,
        private injectables: Object,
        private application: Application
    ) {
        for (let view of this.views)
            this.register(view);

        console.log(chalk.bgCyan.black(`Registered ${this.registered} Routes`));
    }

    private register(view: any): void {

        // Get the view metadata.
        let metadata: IViewDecorator = Reflect.getMetadata('unison:component', view);

        // Loop through all the methods of the view.
        for (let method of Object.getOwnPropertyNames(Object.getPrototypeOf(new view))) {
            if (Reflect.hasMetadata('unison:route', new view(), method)) {

                this.registered++;

                // Get the route data and the route permissions.
                let routeMetadata: IRouteDecorator = Reflect.getMetadata('unison:route', new view(), method);
                let permissions: Array<any> = Reflect.getMetadata('unison:permissions', new view(), method);

                // Register the express routes.
                this.application[MethodMap[routeMetadata.method]](GenerateURI(metadata.base, routeMetadata.route), (request: Request, response: Response) => {

                    let required = new Required().verify(request,
                        Reflect.getMetadata('unison:required-headers', new view(), method),
                        Reflect.getMetadata('unison:required-body', new view(), method),
                        Reflect.getMetadata('unison:required-query', new view(), method));

                    if (required.length > 0)
                        return response.json({ success: false, errors: required });

                    // Check for permissions
                    new Permissions()
                        .verify(request, response, permissions, this.injectables)
                        .then(success => {
                            let dependencies = [];

                            if (Reflect.getMetadata('design:paramtypes', view) !== undefined && Reflect.getMetadata('design:paramtypes', view).length > 0) {
                                for (let dependency of Reflect.getMetadata('design:paramtypes', view)) {
                                    dependencies.push(this.injectables[ClassName(dependency)]);
                                }
                            }

                            new view(...dependencies)[method](request, response)
                                .catch(error => console.error(error));
                        })
                        .catch(error => {});
                });

                this.logRoute(GenerateURI(metadata.base, routeMetadata.route), routeMetadata.method);

            }
        }

    }

    private logRoute(url: string, method: Method) {
        switch (method) {
            case Method.GET:
                console.log(`${chalk.green(MethodMap[method].toUpperCase())} - ${chalk.italic(url)}`);
                break;
            case Method.POST:
                console.log(`${chalk.cyan(MethodMap[method].toUpperCase())} - ${chalk.italic(url)}`);
                break;
            case Method.DELETE:
                console.log(`${chalk.red(MethodMap[method].toUpperCase())} - ${chalk.italic(url)}`);
                break;
            default:
                console.log(`${chalk.black(MethodMap[method].toUpperCase())} - ${chalk.italic(url)}`);
                break;
        }
    }

}
