/**
 * Gets the class name from a class.
 * 
 * @export
 * @param {Function} clazz 
 * @returns {string} 
 */
export function ClassName(clazz: any): string {
    return new clazz().constructor.name.toString();
}


/**
 * @description Returns a list of the class methods.
 * 
 * @export
 * @param {*} clazz 
 * @returns {Array<any>} 
 */
export function ClassMethods(clazz: any): Array<any> {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(new clazz));
}