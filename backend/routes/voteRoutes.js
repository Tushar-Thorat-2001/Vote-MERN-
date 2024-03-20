import express from "express"
import {createVoter,getVoter,deletevote,updatevote} from "../controllers/voteController.js"



const router = express.Router();

router.route("/create").post(createVoter);
router.route("/").get(getVoter);
router.route("/:id").delete(deletevote).post(updatevote);

export default router;