import { IViewDecorator } from './view.interface';
/**
 * Defines a unison view.
 *
 * @export
 * @param {IViewDecorator} config
 * @returns
 */
export declare function Component(config: IViewDecorator): <TFunction extends Function>(target: TFunction) => void;
