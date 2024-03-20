import mongoose from "mongoose";

const votedUserSchema = new mongoose.Schema({
   userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   email:{
      type:String,
      require:true
  },

   voterID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"vote",
    required:true

   }
})


const votedUserModel = mongoose.model("voted",votedUserSchema);

export default votedUserModel ;