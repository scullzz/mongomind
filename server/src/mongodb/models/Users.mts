import mongoose, {Schema, model, InferSchemaType} from "mongoose";

const User = new Schema({
    name: {type: String, required: true},
    level: {type:Number, default:1, required:true},
    email: {type:String, required: true,},
    password: {type:String, required:true,},
})

type IUser = InferSchemaType<typeof User>;

export default model<IUser>("User", User);