import { IComponentDecorator } from './component.interface';

/**
 * Defines a unison view.
 * 
 * @export
 * @param {IViewDecorator} config 
 * @returns 
 */
export function Component(config: IComponentDecorator) {
    return <TFunction extends Function>(target: TFunction) => {
        Reflect.defineMetadata('unison:component', config, target);
    }
}
