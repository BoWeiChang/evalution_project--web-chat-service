// routes/api-routes.ts

// import express, { Router, Request, Response, NextFunction } from 'express';
//import {ApiControllers} from './api-controllers';
import  * as Express from 'express';
import * as ApiControllers from './api-controllers';

const apiControllers = new ApiControllers.ApiControllers;

export class ApiRouter {
  router: Express.Router;
  constructor() {
    this.router = Express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', apiControllers.getLoginPage);
    this.router.get('/chat_room', apiControllers.getChatroomPage);
  }
}