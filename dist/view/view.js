"use strict";
const chalk = require("chalk");
const general_util_1 = require("../utils/general.util");
const view_util_1 = require("../utils/view.util");
const method_enum_1 = require("./method.enum");
/**
 * Registeres the view for the application.
 *
 * @export
 * @class ViewRegister
 */
class ViewRegister {
    constructor(views, injectables, application) {
        this.views = views;
        this.injectables = injectables;
        this.application = application;
        console.log(chalk.bgCyan.black('Registering Routes'));
        for (let view of this.views)
            this.register(view);
        console.log(chalk.bgCyan.black(`Registered ${this.views.length} Routes`));
    }
    register(view) {
        // Get the view metadata.
        let metadata = Reflect.getMetadata('unison:view', view);
        // Loop through all the methods of the view.
        for (let method of Object.getOwnPropertyNames(Object.getPrototypeOf(new view))) {
            if (Reflect.hasMetadata('unison:route', new view(), method)) {
                // Get the route data and the route permissions.
                let routeMetadata = Reflect.getMetadata('unison:route', new view(), method);
                let permissions = Reflect.getMetadata('unison:permissions', new view(), method);
                // Generate the route uri from the route and view metadata.
                let uri = view_util_1.GenerateURI(metadata.base, routeMetadata.route);
                // Register the express routes.
                this.application[method_enum_1.MethodMap[routeMetadata.method]](uri, (request, response) => {
                    // Ensure request passses all permission checks.
                    if (permissions.length > 0) {
                        for (let permission of permissions) {
                            if (!this.injectables[general_util_1.ClassName(permission)]['check'](request, response)) {
                                return this.injectables[general_util_1.ClassName(permission)]['reject'](request, response);
                            }
                        }
                    }
                    // Inject view dependencies.
                    let dependencies = [];
                    if (Reflect.getMetadata('design:paramtypes', view) !== undefined &&
                        Reflect.getMetadata('design:paramtypes', view).length > 0) {
                        for (let dependency of Reflect.getMetadata('design:paramtypes', view)) {
                            dependencies.push(this.injectables[general_util_1.ClassName(dependency)]);
                        }
                    }
                    new view(...dependencies)[method](request, response);
                });
            }
        }
    }
}
exports.ViewRegister = ViewRegister;
