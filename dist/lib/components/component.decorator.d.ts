import { IComponentDecorator } from './component.interface';
/**
 * @description Defines a Unison Component.
 *
 * @export
 * @param {IComponentDecorator} config - Component Configuration
 * @returns
 */
export declare function Component(config: IComponentDecorator): <TFunction extends Function>(target: TFunction) => void;
