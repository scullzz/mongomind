import { InferSchemaType, Schema, model } from "mongoose";

const Counter = new Schema({
    id: {type: String},
    seq: {type: Number}
})

type ICounter = InferSchemaType<typeof Counter>
export default model<ICounter>("Counter", Counter);