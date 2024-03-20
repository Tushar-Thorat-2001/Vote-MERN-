import asyncHandler from "express-async-handler"

import Vote from "../models/voterModels.js"


const createVoter = asyncHandler(async (req, res) => {
	const { name,voteCount} = req.body;

	
	const vote = await Vote.create({ name, voteCount});

	if (vote) {
		// successfully created
		res.status(201).json({
			_id: vote._id,
			name: vote.name,
			voteCount:vote.voteCount,
			
		});
	} else {
		res.status(400); // Bad request
		throw new Error('Invalid vote data');
	}
});


 const getVoter  = asyncHandler(async(req,res)=>{
	const voter = await Vote.find({});
	res.json(voter)

 })


const deletevote  = asyncHandler(async(req,res)=>{
   

    if(req.params.id){
       const deletetodo = await Vote.findByIdAndDelete(req.params.id);
       res.json({ message: "User deleted successfully", deletetodo });
    }else{
        res.status(404);
        throw new Error("todo not found")
    }
})

const updatevote = asyncHandler(async(req,res)=>{
	const {name}= req.body
 
	const update = await Vote.findById(req.params.id);
 
	if(update){
	 update.name = name
	 const newvote = await update.save();
	 res.json(newvote)
 
	}else{
	 res.status(404);
	 throw new Error('Todo not found')
	}
 });





export {createVoter ,getVoter,deletevote,updatevote }