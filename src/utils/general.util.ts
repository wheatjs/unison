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
