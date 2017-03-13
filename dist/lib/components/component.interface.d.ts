/**
 * @description Component Configuration
 *
 * @export
 * @interface IComponentDecorator
 */
export interface IComponentDecorator {
    routes?: {
        baseUrl?: string;
        method?: string;
    };
    sockets?: {};
}
