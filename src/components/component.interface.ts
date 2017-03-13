import { Method } from "./method.enum";

export interface IComponentDecorator {
    
    routes?: {
        baseUrl?: string;
        method?: Method;
    };

    sockets?: {

    };

}