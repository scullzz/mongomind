import Counter from "../Counter.mjs";


async function getNextSequenceNnumber(name:string){
    try{
        var ret = await Counter.findOneAndUpdate(
              { id: name },
              { $inc: { seq: 1 } },
              {new: true}
        );
        if(ret){
            return ret.seq;
        }
        else{
            throw new Error("No next sequence");
        }
    }
    catch(err){
        console.log(err);
    }
}

export default getNextSequenceNnumber;