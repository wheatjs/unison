"use strict";
function UnisonApp(config) {
    return (target) => {
        Reflect.defineMetadata('unison:app', config, target);
    };
}
exports.UnisonApp = UnisonApp;
