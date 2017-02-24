/**
 * Gets the class name from a class.
 * 
 * @export
 * @param {Function} clazz 
 * @returns {string} 
 */
export function ClassName(clazz: Function): string {
    return clazz.toString().split('class')[1].split('{')[0].trim();
}
