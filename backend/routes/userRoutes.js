import express from "express"

import {authUser,registerUser} from "../controllers/userController.js"
// import {protect} from "../middlewares/authMiddlerwars.js"

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);


export default router;