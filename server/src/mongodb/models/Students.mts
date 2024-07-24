import mongoose, {InferSchemaType, model, Schema} from "mongoose";

const Student = new Schema({
    firstname: {type:String},
    lastname: {type:String},
    date_of_birth: {type:String},
    email: {type:String},
    faculty: {string:String},
    group: {type:Number},
})

type IStudent = InferSchemaType<typeof Student>;

export const Students = model<IStudent>("Students", Student);
export const StudentsSchemaKeys = Object.keys(Student.paths);
