"use strict";
// routes/api-routes.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
// import express, { Router, Request, Response, NextFunction } from 'express';
//import {ApiControllers} from './api-controllers';
var Express = __importStar(require("express"));
var ApiControllers = __importStar(require("./api-controllers"));
var apiControllers = new ApiControllers.ApiControllers;
var ApiRouter = /** @class */ (function () {
    function ApiRouter() {
        this.router = Express.Router();
        this.initializeRoutes();
    }
    ApiRouter.prototype.initializeRoutes = function () {
        this.router.get('/', apiControllers.getLoginPage);
        this.router.get('/chat_room', apiControllers.getChatroomPage);
    };
    return ApiRouter;
}());
exports.ApiRouter = ApiRouter;
