import mongoose from "mongoose";

export const connectDB = async()=>{

    try {
        const DB_CONNECTION_STRING =
        process.env.NODE_ENV === "production"
            ? process.env.MONGODB_URI!
            : process.env.MONGODB_LOCAL_URI!;

        const dbResponse = await mongoose.connect(DB_CONNECTION_STRING);
        console.log("db connect successfully." , dbResponse.connection.host);
    } catch (error) {
        console.log('db connection error',error);
        process.exit(1);
        // throw new Error("Database connection string is not defined");
    }

}