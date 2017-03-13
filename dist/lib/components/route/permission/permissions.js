"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
class PermissionsHandler {
    verify(request, response, permissions, injectables) {
        return __awaiter(this, void 0, void 0, function* () {
            if (permissions !== undefined && permissions.length > 0) {
                for (let permission of permissions) {
                    try {
                        yield injectables[utils_1.ClassName(permission)]['check'](request, response);
                    }
                    catch (error) {
                        injectables[utils_1.ClassName(permission)]['reject'](request, response);
                        return Promise.reject(error);
                    }
                }
            }
            return Promise.resolve();
        });
    }
}
exports.PermissionsHandler = PermissionsHandler;
