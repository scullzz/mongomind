import { InferSchemaType, Schema, model } from "mongoose";

const Problem = new Schema({
    db_name: {type: String},
    taskNumber: {type: Number},
    task: {type: String},
    expected: {type: String},
    properties: {type: String},
    extraFileds: {type: String},
}); 


type IProblem = InferSchemaType<typeof Problem>;
export default model<IProblem>("Problem", Problem);