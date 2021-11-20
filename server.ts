// ./server.ts
import * as Express from "express";
import * as path from "path";
import * as APIRouter from './api-routes';
import * as socketHandler from "./socket-mongodb";
// const router = Express.Router();
const app : Express.Express = require("express")();
const apiRouter = new APIRouter.ApiRouter;


// 需要引用本機上的css檔，必須先設定路徑
app.use("/client", Express.static(path.join(__dirname , 'client')));

// 設置伺服器的架構
app.set("port", process.env.PORT || 5000);
app.use('', apiRouter.router);

app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.type('text/plain');
    res.status(404);
    res.send('Page is not found.');
    next;
})

//測試是否執行(未成功執行)
// app.get("/", (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
//     console.log('hello');
//     res.send('GET request to homepage');
//     next;

// });

var http : any = require("http").Server(app);
// 架設socket.io在我們的伺服器上
const io : any = require("socket.io")(http);

var room: string = "test_room";
// 當使用者進到網頁的時候，分配scoketID胎他
io.on("connection", async (socket: any) => {
    socket.join(room);
    console.log("a user connected");
    console.log(socket.rooms);

    //藉由 socketHandler 負責伺服器與資料庫之間的溝通 
    const socket_handler = new socketHandler.SocketHandler();
    socket_handler.connect();
    
    //注意註冊的消息並傳送資訊
    socket.on('sign_up', async(user_info: any) =>{
        console.log(user_info);
        const result = await socket_handler.sign_up(user_info);
        socket.emit("sign_up", result);
    });

    //登入
    socket.on('login', async(user_info: any) =>{
        const result = await socket_handler.login(user_info);
        socket.emit("login", result);
    });
    
    //result == true --> 登入成功，頁面轉換至聊天室畫面並載入歷史對話
    socket.on('to_chatroom', async(result: any) =>{
        if (result == true){
            console.log('change to chatroom');
            //app.use不會執行(原因待查)
            app.use("/", (req: Express.Request, res: Express.Response, next: Express.NextFunction)=>{
                console.log('entry chatroom');
                res.send('GET request to chat room');
                res.redirect('./chat_room');
            });
              //取得聊天室中過往的所有對話資訊
            // const history = await socket_handler.getMessages();
            // const socket_id = socket.id;
            // // console.log(socket_id);
            // io.to(socket_id).emit('history', history);
        }

    });    
        
    //取得聊天室中過往的所有對話資訊
    const history = await socket_handler.getMessages();
            const socket_id = socket.id;
            io.to(socket_id).emit('history', history);
    
    //注意來自於客戶端的訊息
    socket.on("message", (data: any) => {
        console.log(data);
        socket_handler.storeMessages(data);
        socket.emit("message", data);
        socket.to(room).emit("message", data);
    });
    //接收有人離開聊天室的訊息
    socket.on("disconnecting", () => {
        console.log(socket.rooms); // the Set contains at least the socket ID
    });

    //停止連接
    socket.on("disconnect",function() : void {
        socket.leave();
        console.log("a user disconnected");
    });
    
});

// 開啟伺服器的服務(port:5000)
const server = http.listen(5000, function() {
  console.log("listening on port 5000");
});