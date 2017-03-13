import { IComponentDecorator } from './component.interface';

/**
 * @description Defines a Unison Component.
 * 
 * @export
 * @param {IComponentDecorator} config - Component Configuration
 * @returns  
 */
export function Component(config: IComponentDecorator) {
    return <TFunction extends Function>(target: TFunction) => {
        Reflect.defineMetadata('unison:component', config, target);
    }
}
