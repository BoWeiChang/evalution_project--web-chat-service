"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// ./server.ts
var Express = __importStar(require("express"));
var path = __importStar(require("path"));
var APIRouter = __importStar(require("./api-routes"));
var socketHandler = __importStar(require("./socket-mongodb"));
// const router = Express.Router();
var app = require("express")();
var apiRouter = new APIRouter.ApiRouter;
// ????????????????????????css???????????????????????????
app.use("/client", Express.static(path.join(__dirname, 'client')));
// ????????????????????????
app.set("port", process.env.PORT || 5000);
app.use("", apiRouter.router);
app.use(function (req, res, next) {
    res.type('text/plain');
    res.status(404);
    res.send('Page is not found.');
});
//??????????????????(???????????????)
// app.post("/",  (req: Express.Request, res: Express.Response, next: Express.NextFunction)=>{
//     console.log('entry chatroom');
//     // res.send('Get request to chat_room');
//     res.redirect('./chat_room');
// });
var http = require("http").Server(app);
// ??????socket.io????????????????????????
var io = require("socket.io")(http);
var room = "test_room";
// ??????????????????????????????????????????scoketID??????
io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var socket_handler, history, socket_id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                socket.join(room);
                console.log("a user connected");
                console.log(socket.rooms);
                socket_handler = new socketHandler.SocketHandler();
                socket_handler.connect();
                return [4 /*yield*/, socket_handler.getMessages()];
            case 1:
                history = _a.sent();
                socket_id = socket.id;
                io.to(socket_id).emit('history', history);
                //????????????????????????????????????
                socket.on('sign_up', function (user_info) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(user_info);
                                return [4 /*yield*/, socket_handler.sign_up(user_info)];
                            case 1:
                                result = _a.sent();
                                socket.emit("sign_up", result);
                                return [2 /*return*/];
                        }
                    });
                }); });
                //??????
                socket.on('login', function (user_info) { return __awaiter(void 0, void 0, void 0, function () {
                    var result, info;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, socket_handler.login(user_info)];
                            case 1:
                                result = _a.sent();
                                info = {
                                    result: result,
                                    user_info: user_info
                                };
                                socket.emit("login_result", info);
                                return [2 /*return*/];
                        }
                    });
                }); });
                // //result == true --> ??????????????????????????????????????????????????????????????????
                socket.on('to_chatroom', function (info) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                }); });
                //?????????????????????????????????
                socket.on("message", function (data) {
                    console.log(data);
                    socket_handler.storeMessages(data);
                    socket.emit("message", data);
                    socket.to(room).emit("message", data);
                });
                //????????????????????????????????????
                socket.on("disconnecting", function () {
                    console.log(socket.rooms); // the Set contains at least the socket ID
                });
                //????????????
                socket.on("disconnect", function () {
                    socket.leave();
                    console.log("a user disconnected");
                });
                return [2 /*return*/];
        }
    });
}); });
// ????????????????????????(port:5000)
var server = http.listen(5000, function () {
    console.log("listening on port 5000");
});
