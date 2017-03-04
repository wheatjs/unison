"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const general_util_1 = require("../utils/general.util");
class Permissions {
    verify(request, response, permissions, injectables) {
        return __awaiter(this, void 0, void 0, function* () {
            if (permissions !== undefined && permissions.length > 0) {
                for (let permission of permissions) {
                    try {
                        if (!(yield injectables[general_util_1.ClassName(permission)]['check'](request, response))) {
                            injectables[general_util_1.ClassName(permission)]['reject'](request, response);
                            return Promise.reject(false);
                        }
                    }
                    catch (error) {
                        injectables[general_util_1.ClassName(permission)]['reject'](request, response);
                        return Promise.reject(false);
                    }
                }
            }
            return Promise.resolve(true);
        });
    }
}
exports.Permissions = Permissions;
