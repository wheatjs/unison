"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function UnisonApp(config) {
    return (target) => {
        Reflect.defineMetadata('unison:app', config, target);
    };
}
exports.UnisonApp = UnisonApp;
