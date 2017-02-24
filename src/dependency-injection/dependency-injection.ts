import { ClassName } from '../utils/general.util';

/**
 * Creates injectable dependencies
 * 
 * @export
 * @class Injector
 */
export class Injector {

    private container: Object = {};

    constructor(injectables: Array<any>) {
        for (let injectable of injectables)
            this.resolve(injectable);

        console.log(this.container);
    }

    /**
     * Gets the injectable dependencies.
     * 
     * @returns {Object} 
     * 
     * @memberOf Injector
     */
    public getInjectables(): Object {
        return this.container;
    }

    /**
     * Resolves an injectable.
     * 
     * @private
     * @param {*} injectable 
     * 
     * @memberOf Injector
     */
    private resolve(injectable: any): void {
        if (Reflect.getMetadata('design:paramtypes', injectable) !== undefined &&
            Reflect.getMetadata('design:paramtypes', injectable).length > 0) {
            let dependencies = Reflect.getMetadata('design:paramtypes', injectable);

            for (let dependency of dependencies)
                this.resolve(dependency);

            if (this.container[ClassName(injectable)] === undefined) {
                let construct = [];

                for (let dependency of dependencies)
                    construct.push(this.container[ClassName(dependency)]);

                this.container[ClassName(injectable)] = new injectable(...construct);
            }

        } else {
            if (this.container[ClassName(injectable)] === undefined)
                this.container[ClassName(injectable)] = new injectable();
        }
    }

}
