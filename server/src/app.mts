import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import AuthRouter from "./mongodb/routes/AuthRouter.mjs";
import Problem from "./mongodb/models/Problem.mjs";
import { Students, StudentsSchemaKeys } from "./mongodb/models/Students.mjs";
import {
  EmployerModel,
  EmployerShemaKeys,
} from "./mongodb/models/Employers.mjs";
import Counter from "./mongodb/models/Counter.mjs";
import getNextSequenceNnumber from "./mongodb/models/modelFunc/getNextSequence.mjs";
import getPropertiesAsString from "./mongodb/models/modelFunc/getPropertiesasString.mjs";
import { group } from "console";
import { swaggerUi, specs } from "./mongodb/swagger.config.mjs";

const PORT = 8000;
//connection to database
const MongoDb_Connection_String =
  "mongodb+srv://Rasu_va39:saidcool1@cluster0.b8lnrgs.mongodb.net/project";

async function Connection_To_Database(connection: string) {
  await mongoose.connect(connection);
  console.log("Successfully connected to database");
}

try {
  await Connection_To_Database(MongoDb_Connection_String);
} catch (err) {
  console.log("Error connecting to database");
}

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(cors());

app.use("/mongomind/func", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(
    `Documentation in Swagger: http://localhost:${PORT}/api-docs`
  );
});

//tests for server
// const Answer = async () =>{
//     try{
//         const res = await EmployerModel.aggregate([
//             {
//                 $group: {
//                     _id: "$department",
//                     totalEmployees: {$sum: 1},
//                 }
//             },
//             {
//                 $match: {
//                     totalEmployees: {$gt: 1},
//                 }
//             },
//             {
//                 $project: {
//                     totalEmployees: 1,
//                     department: "$_id",
//                     _id: 0,
//                 }
//             }

//         ])

//     console.log(res);

//     }catch(err){
//         console.log(err);
//     }
// }

//----------------------------------------------------------------
// const AllAnswers = async () =>{
//     try{
//         const res = await Employers.aggregate(
//             [
//                 {
//                     $sort: {salary: -1}
//                 },
//                 {
//                     $project: {
//                         _id: 0,
//                         firstname: 1,
//                         lastname: 1,
//                         salary: 1,
//                         department: 1,
//                     }
//                 },
//                 {
//                     $limit: 5
//                 }
//             ]
//         )
//         console.log(res);
//     }catch(err){
//         console.log(err);
//     }
// }

//----------------------------------------------------------------
//This one is realy important for future plans.....

// const str = [
//     {
//         $group: {
//             _id: "$department",
//             averageSalary: {$avg: "$salary"}
//         }
//     }
// ]
// const res = JSON.stringify(str);
// console.log(res);

//----------------------------------------------------------------
//how to turn string to the javasript code

// const run = async (query:string, second: string) => {
//     try {
//         const user = await Function('Students', `return ${query}`)(Students);
//         const user1 = await Function('Students', `return ${second}`)(Students);
//         if(JSON.stringify(user)== JSON.stringify(user1)) {
//             console.log("equals");
//         }else{
//             console.log("false");
//         }
//     } catch (err) {
//         console.log(err);
//         console.log("Wrong query");
//     }
// }

// const queryString = 'Students.aggregate([{$match: {}}])';
// const secondQ = 'Students.aggregate([{$match: {}}])';
// run(queryString, secondQ);
