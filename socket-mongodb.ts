import { isShorthandPropertyAssignment } from "typescript";
import * as Messages from "./schema/messages";
import * as Users from "./schema/user" ;

// const messages = require('Messages');
// const messages = require('./schema/messages');
const moment = require('moment');
class SocketHandler {
    db: any;

    constructor() {
        this.db;
    }

    connect() {
        this.db = require('mongoose').connect('mongodb://localhost:27017/chat');
        this.db.Promise = global.Promise;
    }

    getMessages() {
        return Messages.MessageModel.find();
    }

    storeMessages(data : any) {

        // console.log(data);
        const newMessages = new Messages.MessageModel({
            name: data.name,
            message: data.message,
            time: moment().format('YYYY-MM-DD HH:mm:ss')
        });

        const doc = newMessages.save();
    }
    //註冊資料檢查：檢查是否出現重複的帳號或密碼，都沒有重複就紀錄至資料庫
    async sign_up(user_info: any){
        const newUsers = new Users.UserModel({
            account: user_info.account,
            password: user_info.password, 
            username: user_info.username
        });

        const accountExists =  await Users.UserModel.exists({ account: user_info.account });
        if (accountExists==true){
            console.log('該帳號已被使用');
            return ("註冊失敗： 該帳號已被使用！");
        }else{
            const passwordExists =  await Users.UserModel.exists({ password: user_info.password });
            if (passwordExists==true){
                console.log('該密碼已被使用');
                return ("註冊失敗： 該密碼已被使用！");   
            }else{
                const doc = newUsers.save();
                console.log("帳號創立成功");                
                return "帳號創立成功！！";
            }
        }
    }

    //登入資料檢查
    async login(user_info: any){
        const user = new Users.UserModel({
            account: user_info.account,
            password: user_info.password, 
        });

        const userExists =  await Users.UserModel.exists({account: user_info.account, password: user_info.password});
            if(userExists==true){
                console.log('登入成功');
                return true; 
            }else{
                console.log('登入失敗：帳號或密碼有誤');
                return false;
            }

        // Users.UserModel.exists({account: user.account}, function (err, doc) {
        //     if (err){
        //         console.log('該帳號不存在');
        //         return "登入失敗： 該帳號不存在";
        //     }else{
        //         Users.UserModel.find({ account: user.account, password: user.password}, function (err, doc) {
        //             if(err){
        //                 console.log("密碼輸入錯誤");
        //                 return "登入失敗： 密碼輸入錯誤";
        //             }else{
        //                 console.log("登入成功");

        //             }
        //         });
        //     }
        // });
        
    }
}
export{ SocketHandler}
// module.exports = SocketHandler;
