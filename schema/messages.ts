import * as mongodb from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Imessage {
    name: string;
    message: string;
    time: string;
}
// 2. Create a Schema corresponding to the document interface.
const schema = new mongodb.Schema<Imessage>({
    name: { type: String, required: true },
    message: { type: String, required: true },
    time: {type: String, required: true}
});

//第三步驟之後移到主程式
// 3. Create a Model.
const MessageModel = mongodb.model<Imessage>('messages', schema);

export{ MessageModel, Imessage}
