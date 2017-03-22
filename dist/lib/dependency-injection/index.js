"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_injection_1 = require("./dependency-injection");
exports.Injector = dependency_injection_1.Injector;
var injectable_decorator_1 = require("./decorators/injectable.decorator");
exports.Injectable = injectable_decorator_1.Injectable;
var inject_decorator_1 = require("./decorators/inject.decorator");
exports.Inject = inject_decorator_1.Inject;
