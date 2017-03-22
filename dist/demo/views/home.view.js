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
const index_1 = require("../../index");
const user_service_1 = require("../services/user.service");
const authenticated_permission_1 = require("../permissions/authenticated.permission");
let HomeComponent = class HomeComponent {
    constructor(userService, io) {
        this.userService = userService;
        this.io = io;
    }
    list(req, res) {
        return res.send({
            success: true,
            message: this.userService.getUser()
        });
    }
    create(req, res) {
        return res.send({
            success: true,
            message: this.userService.getUser()
        });
    }
    connection(io, socket) {
        console.log('A New User Connected');
    }
    HelloWorld(io, socket, data) {
        console.log('On Disconnected');
    }
    connect(io, socket, data) {
        socket.emit('established', 'Connection was established');
        io.emit('established', 'Hello From IO');
    }
};
__decorate([
    index_1.Route({ route: '/list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], HomeComponent.prototype, "list", null);
__decorate([
    index_1.Permissions([authenticated_permission_1.Authenticated, authenticated_permission_1.Authenticated2]),
    index_1.RequiredBody(['username']),
    index_1.Route({ route: '/create', method: index_1.Method.POST }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], HomeComponent.prototype, "create", null);
__decorate([
    index_1.IO('connection'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HomeComponent.prototype, "connection", null);
__decorate([
    index_1.Socket('disconnect'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], HomeComponent.prototype, "HelloWorld", null);
__decorate([
    index_1.Socket('new'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], HomeComponent.prototype, "connect", null);
HomeComponent = __decorate([
    index_1.Component({
        routes: {
            baseUrl: '/api/home',
            method: index_1.Method.PUT,
            permissions: [authenticated_permission_1.Authenticated]
        }
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        index_1.SocketIOServer])
], HomeComponent);
exports.HomeComponent = HomeComponent;
