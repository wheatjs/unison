import { Method } from '../../../http';

/**
 * Unison Route Decorator
 * 
 * @export
 * @interface IRouteDecorator
 */
export interface IRouteDecorator {
    route: string;
    method?: string
}