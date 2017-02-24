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
const api_service_1 = require("./api.service");
let UserService = class UserService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    getUser() {
        return this.apiService.test('HELLO WORLD');
    }
};
UserService = __decorate([
    index_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.APIService])
], UserService);
exports.UserService = UserService;
