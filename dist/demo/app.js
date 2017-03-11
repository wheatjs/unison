"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const home_view_1 = require("./views/home.view");
const api_service_1 = require("./services/api.service");
const user_service_1 = require("./services/user.service");
const authenticated_permission_1 = require("./permissions/authenticated.permission");
let App = class App {
};
App = __decorate([
    index_1.UnisonApp({
        views: [
            home_view_1.HomeView
        ],
        services: [
            api_service_1.APIService,
            user_service_1.UserService,
            authenticated_permission_1.Authenticated,
            authenticated_permission_1.Authenticated2
        ]
    })
], App);
new index_1.UnisonServer({ host: 'localhost', port: 8080 }).bootstrap(App);
