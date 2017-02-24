import { Application } from 'express';
import * as chalk from 'chalk';

import { ClassName } from '../utils/general.util';
import { IViewDecorator } from './view.interface';
import { IRouteDecorator } from "./route.interface";
import { GenerateURI } from "../utils/view.util";
import { MethodMap } from "./method.enum";

/**
 * Registeres the view for the application.
 * 
 * @export
 * @class ViewRegister
 */
export class ViewRegister {

    constructor(
        private views: Array<any>,
        private injectables: Object,
        private application: Application
    ) {
        console.log(chalk.bgCyan.black('Registering Routes'));

        for (let view of this.views)
            this.register(view);

        console.log(chalk.bgCyan.black(`Registered ${this.views.length} Routes`));
    }

    private register(view: any): void {

        // Get the view metadata.
        let metadata: IViewDecorator = Reflect.getMetadata('unison:view', view);

        // Loop through all the methods of the view.
        for (let method of Object.getOwnPropertyNames(Object.getPrototypeOf(new view))) {
            if (Reflect.hasMetadata('unison:route', new view(), method)) {

                // Get the route data and the route permissions.
                let routeMetadata: IRouteDecorator = Reflect.getMetadata('unison:route', new view(), method);
                let permissions: Array<any> = Reflect.getMetadata('unison:permissions', new view(), method);

                // Generate the route uri from the route and view metadata.
                let uri = GenerateURI(metadata.base, routeMetadata.route);

                // Register the express routes.
                this.application[MethodMap[routeMetadata.method]](uri, (request, response) => {

                    // Ensure request passses all permission checks.
                    if (permissions !== undefined && permissions.length > 0) {
                        for (let permission of permissions) {
                            if (!this.injectables[ClassName(permission)]['check'](request, response)) {
                                return this.injectables[ClassName(permission)]['reject'](request, response);
                            }
                        }
                    }

                    // Inject view dependencies.
                    let dependencies = [];

                    if (Reflect.getMetadata('design:paramtypes', view) !== undefined &&
                        Reflect.getMetadata('design:paramtypes', view).length > 0) {
                        for (let dependency of Reflect.getMetadata('design:paramtypes', view)) {
                            dependencies.push(this.injectables[ClassName(dependency)]);
                        }
                    }

                    new view(...dependencies)[method](request, response);

                });

            }
        }

    }

}
