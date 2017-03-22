/**
 * Creates an injectable class.
 * 
 * @export
 * @returns 
 */
export function Inject(injectable: any) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata('unison:as', injectable, target, propertyKey);
    }
}
