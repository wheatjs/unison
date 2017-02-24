import { IViewDecorator } from './view.interface';

/**
 * Defines a unison view.
 * 
 * @export
 * @param {IViewDecorator} config 
 * @returns 
 */
export function View(config: IViewDecorator) {
    return <TFunction extends Function>(target: TFunction) => {
        Reflect.defineMetadata('unison:view', config, target);
    }
}
