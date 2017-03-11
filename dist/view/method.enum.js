"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Method;
(function (Method) {
    Method[Method["GET"] = 0] = "GET";
    Method[Method["POST"] = 1] = "POST";
    Method[Method["PATCH"] = 2] = "PATCH";
    Method[Method["DELETE"] = 3] = "DELETE";
    Method[Method["COPY"] = 4] = "COPY";
    Method[Method["HEAD"] = 5] = "HEAD";
    Method[Method["OPTIONS"] = 6] = "OPTIONS";
    Method[Method["LINK"] = 7] = "LINK";
    Method[Method["UNLINK"] = 8] = "UNLINK";
    Method[Method["PURGE"] = 9] = "PURGE";
    Method[Method["LOCK"] = 10] = "LOCK";
    Method[Method["UNLOCK"] = 11] = "UNLOCK";
    Method[Method["PROPFIND"] = 12] = "PROPFIND";
    Method[Method["VIEW"] = 13] = "VIEW";
    Method[Method["PUT"] = 14] = "PUT";
})(Method = exports.Method || (exports.Method = {}));
exports.MethodMap = {
    0: 'get',
    1: 'post',
    2: 'patch',
    3: 'delete',
    4: 'copy',
    5: 'head',
    6: 'options',
    7: 'link',
    8: 'unlink',
    9: 'purge',
    10: 'lock',
    11: 'unlock',
    12: 'propfind',
    13: 'view',
    14: 'put'
};
