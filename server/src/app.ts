import express, { json } from "express";
import dotenv from "dotenv";
import cors from 'cors';

import { connectDB } from "./db";

import todoRoute from './routes/todo';

dotenv.config({
    path: "src/.env"
});

const app = express();
app.use(json());

app.use(cors({
    origin : process.env.CLIENT_URL
}))

const PORT = process.env.PORT || 4000;

app.use("/todos",todoRoute);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}.`);
    connectDB();
})