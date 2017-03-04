"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const index_1 = require("../../index");
let Authenticated = class Authenticated {
    constructor() { }
    check(req, res) {
        return new Promise((resolve, reject) => {
            return resolve(true);
        });
    }
    reject(req, res) {
        return res.send({
            success: false,
            error: 'Failed To Authenticate'
        });
    }
};
Authenticated = __decorate([
    index_1.Injectable(),
    __metadata("design:paramtypes", [])
], Authenticated);
exports.Authenticated = Authenticated;
let Authenticated2 = class Authenticated2 {
    constructor() { }
    check(req, res) {
        return new Promise((resolve, reject) => {
            return resolve(false);
        });
    }
    reject(req, res) {
        return res.send({
            success: false,
            error: 'Failed To Authenticate 2'
        });
    }
};
Authenticated2 = __decorate([
    index_1.Injectable(),
    __metadata("design:paramtypes", [])
], Authenticated2);
exports.Authenticated2 = Authenticated2;
