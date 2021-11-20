// controllers/api-controllers.ts
// import * as express from 'express';
import * as Express from 'express';
// import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
export class ApiControllers {
  getLoginPage(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    res.type('.html');
    res.sendFile(path.resolve("./client/login.html"));
  }

  getChatroomPage(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    res.type('.html');
    res.sendFile(path.resolve("./client/index.html"));
  }
 
}