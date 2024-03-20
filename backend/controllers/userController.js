import asyncHandler from "express-async-handler"

import User from "../models/userModels.js"
import generateToken from "../utils/generateToken.js"
import voted from "../models/voteduserModels.js"


/**
 * @desc		Auth user
 * @route		POST /api/users/login
 * @access	public
 */

const authUser = asyncHandler(async (req, res) => {
	const { email, password} = req.body;

	const user = await User.findOne({ email });
	 



		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
			console.log("User is Success")
		} else {
			res.status(401);
			throw new Error('Invalid email or password');
		}
	

});



/**
 * @desc		Register new user
 * @route		POST /api/users
 * @access	public
 */


const registerUser = asyncHandler(async (req, res) => {
	const { name, password,email,phone,isAdmin } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400); // Bad request
		throw new Error('User already exists');
	}

	const user = await User.create({ name, password,email,phone ,isAdmin });

	if (user) {
		// successfully created
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
            phone:user.phone,
			token: generateToken(user._id),
		});
	} else {
		res.status(400); // Bad request
		throw new Error('Invalid user data');
	}
});


export {authUser,registerUser};