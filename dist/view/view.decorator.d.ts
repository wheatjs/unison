import { IViewDecorator } from './view.interface';
/**
 * Defines a unison view.
 *
 * @export
 * @param {IViewDecorator} config
 * @returns
 */
export declare function View(config: IViewDecorator): <TFunction extends Function>(target: TFunction) => void;
