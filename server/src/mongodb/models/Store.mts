import mongoose, {InferSchemaType, Schema, model} from "mongoose";

const Store = new Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    quantity: {type: Number},
    weight: {type: Number},
    addedAt: {type: Date},
    supplayerCompany: {type: String},
})

type IStore = InferSchemaType<typeof Store>;
export const StoreModel = model<IStore>("Store", Store);
export const StoreSchemaKeys = Object.keys(Store.paths);