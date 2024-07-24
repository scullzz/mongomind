import mongoose, {Schema, model, InferSchemaType} from "mongoose";

const SiteUsers = new Schema({
    fullname: {type:String},
    email: {type:String},
    hashed_password: {type:String},
    subsribers: {type:Number},
    posts: {type:String},
})

type ISiteUsers = InferSchemaType<typeof SiteUsers>;
export const SiteUserModel = model<ISiteUsers>("SiteUsers", SiteUsers);
export const SiteUsersSchemaKeys = Object.keys(SiteUsers.paths);