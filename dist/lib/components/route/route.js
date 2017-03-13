"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const utils_1 = require("../../utils");
const index_1 = require("./index");
const index_2 = require("../../http/index");
/**
 * @description Registers application routes.
 *
 * @export
 * @class RouteRegister
 */
class RouteRegister {
    constructor(components, injectables, application) {
        this.components = components;
        this.injectables = injectables;
        this.application = application;
        this.initialize();
    }
    /**
     * @description - Registers application routes.
     *
     * @private
     *
     * @memberOf RouteRegister
     */
    initialize() {
        for (let component of this.components) {
            // Retrive the component metadata. This will be used to get the
            // component configuration for things like "routeUrl" and "method".
            let metadata = Reflect.getMetadata('unison:component', component);
            for (let method of utils_1.ClassMethods(component)) {
                if (Reflect.hasMetadata('unison:route', new component(), method)) {
                    // Get the route metadata.
                    let routeMetadata = Reflect.getMetadata('unison:route', new component(), method);
                    // Get the route permissions.
                    let routePermissions = Reflect.getMetadata('unison:permissions', new component(), method);
                    // Generate the method that the route will use.
                    let defaultMethod = (routeMetadata.method || metadata.routes.method || 'get');
                    // Generate the uri that the route will use.
                    let uri = utils_1.GenerateURI(metadata.routes.baseUrl || '', routeMetadata.route);
                    // Register express route.
                    this.application[defaultMethod](uri, (request, response) => {
                        // Check if any of the required params are missing.
                        let required = new index_1.RouteRequired().verify(request, Reflect.getMetadata('unison:required-headers', new component(), method), Reflect.getMetadata('unison:required-body', new component(), method), Reflect.getMetadata('unison:required-query', new component(), method));
                        if (required.length > 0)
                            return response
                                .status(index_2.Status.ClientError.BadRequest)
                                .json(required);
                        new index_1.PermissionsHandler()
                            .verify(request, response, routePermissions, this.injectables)
                            .then(success => {
                            let dependencies = [];
                            if (Reflect.getMetadata('design:paramtypes', component) !== undefined &&
                                Reflect.getMetadata('design:paramtypes', component).length > 0) {
                                for (let dependency of Reflect.getMetadata('design:paramtypes', component))
                                    dependencies.push(this.injectables[utils_1.ClassName(dependency)]);
                            }
                            new component(...dependencies)[method](request, response)
                                .catch(error => { console.error(error); });
                        })
                            .catch(error => { });
                    });
                    this.logRoute(uri, defaultMethod);
                }
            }
        }
    }
    logRoute(url, method) {
        switch (method) {
            case index_2.Method.GET:
                console.log(`${chalk.green(method.toUpperCase())} - ${chalk.italic(url)}`);
                break;
            case index_2.Method.POST:
                console.log(`${chalk.cyan(method.toUpperCase())} - ${chalk.italic(url)}`);
                break;
            case index_2.Method.DELETE:
                console.log(`${chalk.red(method.toUpperCase())} - ${chalk.italic(url)}`);
                break;
            default:
                console.log(`${chalk.black(method.toUpperCase())} - ${chalk.italic(url)}`);
                break;
        }
    }
}
exports.RouteRegister = RouteRegister;
