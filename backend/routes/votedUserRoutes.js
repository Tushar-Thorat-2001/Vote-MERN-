import express from "express"

import {createVotedUser} from "../controllers/votedUserController.js"


const router = express.Router();

router.route("/create").post(createVotedUser);


export default router;