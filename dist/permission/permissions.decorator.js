"use strict";
function Permissions(permissions) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('unison:permissions', permissions, target, propertyKey);
    };
}
exports.Permissions = Permissions;
