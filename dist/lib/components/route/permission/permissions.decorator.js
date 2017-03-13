"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Permissions(permissions) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('unison:permissions', permissions, target, propertyKey);
    };
}
exports.Permissions = Permissions;
