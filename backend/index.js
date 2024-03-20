import express from "express";
import cors from "cors";
// import mongoose from "mongoose";
import dotenv from "dotenv"
import connectDB from "../backend/config/db.js"
import userRoutes from "./routes/userRoutes.js"
import voterRoutes from  "./routes/voteRoutes.js"
import votedUserRoutes from "./routes/votedUserRoutes.js"
import {errorHandler,notFound} from "../backend/middlewares/errorMiddlewars.js"


dotenv.config();
connectDB()

const app = express();


 app.use(cors());

 app.use(express.json());

 app.get("/",(req,res)=>{
   res.send("API is running");
})

app.use("/api/users",userRoutes);  
app.use("/api/voter",voterRoutes)
app.use("/api/votedUser",votedUserRoutes)

app.use(notFound);
app.use(errorHandler);


 const PORT = process.env.PORT||5000;
 app.listen(5000,()=>{
    console.log(`sever is running ${PORT}`)
 })

