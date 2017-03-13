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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const home_view_1 = require("./views/home.view");
const api_service_1 = require("./services/api.service");
const user_service_1 = require("./services/user.service");
const authenticated_permission_1 = require("./permissions/authenticated.permission");
let App = class App {
    constructor() {
        console.log('App Launch');
    }
};
App = __decorate([
    index_1.UnisonApp({
        components: [
            home_view_1.HomeComponent
        ],
        injectables: [
            api_service_1.APIService,
            user_service_1.UserService,
            authenticated_permission_1.Authenticated,
            authenticated_permission_1.Authenticated2
        ]
    }),
    __metadata("design:paramtypes", [])
], App);
new index_1.UnisonServer({
    host: 'localhost',
    port: 8080,
    https: {
        enabled: false,
        options: {}
    }
}).bootstrap(App);
