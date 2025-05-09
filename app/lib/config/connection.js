import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connection = async () => {
    try {
        console.log(" Current Mongoose readyState:", mongoose.connection.readyState);
        if(mongoose.connection.readyState === 1) return;
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb database name: ", con.connection.name, " HOST: ", con.connection.host);

    } catch (error) {
        console.log("server error: ", error.message)
    }
}

export default connection