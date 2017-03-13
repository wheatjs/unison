import { IComponentDecorator } from './component.interface';
/**
 * Defines a unison view.
 *
 * @export
 * @param {IViewDecorator} config
 * @returns
 */
export declare function Component(config: IComponentDecorator): <TFunction extends Function>(target: TFunction) => void;
