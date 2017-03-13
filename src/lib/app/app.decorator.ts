import { IUnisonApp } from './app.interface';

export function UnisonApp(config: IUnisonApp) {
    return (target: any) => {
        Reflect.defineMetadata('unison:app', config, target);
    }
}