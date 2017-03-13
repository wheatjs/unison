export function Permissions(permissions: Array<any>): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('unison:permissions', permissions, target, propertyKey);
    };
}