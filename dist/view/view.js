"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const general_util_1 = require("../utils/general.util");
const view_util_1 = require("../utils/view.util");
const method_enum_1 = require("./method.enum");
const required_1 = require("../required/required");
const permissions_1 = require("../permission/permissions");
/**
 * @description Registers application views.
 *
 * @export
 * @class ViewRegister
 */
class ViewRegister {
    constructor(views, injectables, application) {
        this.views = views;
        this.injectables = injectables;
        this.application = application;
        this.registered = 0;
        for (let view of this.views)
            this.register(view);
        console.log(chalk.bgCyan.black(`Registered ${this.registered} Routes`));
    }
    register(view) {
        // Get the view metadata.
        let metadata = Reflect.getMetadata('unison:component', view);
        // Loop through all the methods of the view.
        for (let method of Object.getOwnPropertyNames(Object.getPrototypeOf(new view))) {
            if (Reflect.hasMetadata('unison:route', new view(), method)) {
                this.registered++;
                // Get the route data and the route permissions.
                let routeMetadata = Reflect.getMetadata('unison:route', new view(), method);
                let permissions = Reflect.getMetadata('unison:permissions', new view(), method);
                // Register the express routes.
                this.application[method_enum_1.MethodMap[routeMetadata.method]](view_util_1.GenerateURI(metadata.base, routeMetadata.route), (request, response) => {
                    let required = new required_1.Required().verify(request, Reflect.getMetadata('unison:required-headers', new view(), method), Reflect.getMetadata('unison:required-body', new view(), method), Reflect.getMetadata('unison:required-query', new view(), method));
                    if (required.length > 0)
                        return response.json({ success: false, errors: required });
                    // Check for permissions
                    new permissions_1.Permissions()
                        .verify(request, response, permissions, this.injectables)
                        .then(success => {
                        let dependencies = [];
                        if (Reflect.getMetadata('design:paramtypes', view) !== undefined && Reflect.getMetadata('design:paramtypes', view).length > 0) {
                            for (let dependency of Reflect.getMetadata('design:paramtypes', view)) {
                                dependencies.push(this.injectables[general_util_1.ClassName(dependency)]);
                            }
                        }
                        new view(...dependencies)[method](request, response)
                            .catch(error => console.error(error));
                    })
                        .catch(error => { });
                });
                this.logRoute(view_util_1.GenerateURI(metadata.base, routeMetadata.route), routeMetadata.method);
            }
        }
    }
    logRoute(url, method) {
        switch (method) {
            case method_enum_1.Method.GET:
                console.log(`${chalk.green(method_enum_1.MethodMap[method].toUpperCase())} - ${chalk.italic(url)}`);
                break;
            case method_enum_1.Method.POST:
                console.log(`${chalk.cyan(method_enum_1.MethodMap[method].toUpperCase())} - ${chalk.italic(url)}`);
                break;
            case method_enum_1.Method.DELETE:
                console.log(`${chalk.red(method_enum_1.MethodMap[method].toUpperCase())} - ${chalk.italic(url)}`);
                break;
            default:
                console.log(`${chalk.black(method_enum_1.MethodMap[method].toUpperCase())} - ${chalk.italic(url)}`);
                break;
        }
    }
}
exports.ViewRegister = ViewRegister;
