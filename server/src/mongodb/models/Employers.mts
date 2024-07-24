import mongoose, {InferSchemaType, model, Schema} from "mongoose";

const Employees = new Schema({
    firstname: {type:String},
    lastname: {type:String},
    location: {type:String},
    worked_since: {type:Date},
    department: {type:String},
    salary: {type:Number},
})


type IEmployees = InferSchemaType<typeof Employees>;
export const EmployerModel = model<IEmployees>("Employees", Employees);
export const EmployerShemaKeys = Object.keys(Employees.paths);