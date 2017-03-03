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
                    let requiredQueryParams = Reflect.getMetadata('unison:required-query', new view(), method);
                    let requiredBodyParams = Reflect.getMetadata('unison:required-body', new view(), method);
                    let requiredHeaders = Reflect.getMetadata('unison:required-headers', new view(), method);
                    if (requiredQueryParams !== undefined && requiredQueryParams.length > 0) {
                        for (let param of requiredQueryParams) {
                            if (request.query[param] === undefined) {
                                return response.json({
                                    success: false,
                                    error: `Missing Query Parameter: ${param}`
                                });
                            }
                        }
                    }
                    if (requiredHeaders !== undefined && requiredHeaders.length > 0) {
                        for (let header of requiredHeaders) {
                            if (request.headers[header] === undefined) {
                                return response.json({
                                    success: false,
                                    error: `Missing Header Parameter: ${header}`
                                });
                            }
                        }
                    }
                    if (requiredBodyParams !== undefined && requiredBodyParams.length > 0) {
                        for (let param of requiredBodyParams) {
                            if (request.body[param] === undefined) {
                                return response.json({
                                    success: false,
                                    error: `Missing Body Parameter: ${param}`
                                });
                            }
                        }
                    }
                    // Ensure request passses all permission checks.
                    if (permissions !== undefined && permissions.length > 0) {
                        for (let permission of permissions) {
                            if (typeof this.injectables[general_util_1.ClassName(permission)]['check'](request, response).then === 'undefined') {
                                if (!this.injectables[general_util_1.ClassName(permission)]['check'](request, response)) {
                                    return this.injectables[general_util_1.ClassName(permission)]['reject'](request, response);
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
                            }
                            else {
                                let passed = true;
                                this
                                    .injectables[general_util_1.ClassName(permission)]['check'](request, response)
                                    .then(pass => {
                                    if (pass) {
                                        // Inject view dependencies.
                                        let dependencies = [];
                                        if (Reflect.getMetadata('design:paramtypes', view) !== undefined &&
                                            Reflect.getMetadata('design:paramtypes', view).length > 0) {
                                            for (let dependency of Reflect.getMetadata('design:paramtypes', view)) {
                                                dependencies.push(this.injectables[general_util_1.ClassName(dependency)]);
                                            }
                                        }
                                        new view(...dependencies)[method](request, response);
                                    }
                                    else {
                                        return this.injectables[general_util_1.ClassName(permission)]['reject'](request, response);
                                    }
                                })
                                    .catch(error => this.injectables[general_util_1.ClassName(permission)]['reject'](request, response));
                            }
                        }
                    }
                });
            }
        }
    }
}
exports.ViewRegister = ViewRegister;
