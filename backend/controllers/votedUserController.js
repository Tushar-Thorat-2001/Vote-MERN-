import asyncHandler from "express-async-handler"

import VotedUser from "../models/voteduserModels.js"
import voteModel from "../models/voterModels.js"


export const createVotedUser = asyncHandler(async (req, res) => {
	const {userID,voterID,email} = req.body;

	const count = await voteModel.findByIdAndUpdate(voterID, { $inc: { voteCount: 1 } },{new:true});
	// { $inc: { voteCount: 1 } }: This is the update operation using the $inc operator, which increments the value of the field voteCount by 1.

    // Save the vote record in the database
    // const vote = new Vote({ user_id, candidate_id });
    await count.save();

	const vote = await VotedUser.create({ userID,voterID,email});

	if (vote) {
		// successfully created
		res.status(201).json({
			_id: vote._id,
			userID: vote.userID,
			voterID:vote.voterID,
			email:vote.email,
			
		});
	} else {
		res.status(400); // Bad request
		throw new Error('Invalid vote data');
	}
});


