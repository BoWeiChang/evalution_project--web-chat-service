import * as mongodb from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Iuser {
    account: string;
    password: string;
    username: string;
}
// 2. Create a Schema corresponding to the document interface.
const schema = new mongodb.Schema<Iuser>({
    account: { type: String, required: true },
    password: { type: String, required: true },
    username: {type: String}
});

//第三步驟之後移到主程式
// 3. Create a Model.
const UserModel = mongodb.model<Iuser>('users', schema);

export{ UserModel, Iuser}