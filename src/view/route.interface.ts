import { Method } from './method.enum';

/**
 * Unison Route Decorator
 * 
 * @export
 * @interface IRouteDecorator
 */
export interface IRouteDecorator {
    route: string;
    method: Method
}