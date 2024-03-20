import mongoose from "mongoose";


const voteSchema = new mongoose.Schema({
    name:{
        type:String
    },
    voteCount:{
        type:Number,
        default:0,
        
    }
})


const voteModel = mongoose.model("vote",voteSchema);

export default voteModel;