import mongoose from "mongoose";

const connection = async () => {
    try {
        console.log(" Current Mongoose readyState:", mongoose.connection.readyState);
        if(mongoose.connection.readyState === 1) return;
        const con = await mongoose.connect("mongodb://localhost:27017/school_enrollment");
        console.log("connected to mongodb database name: ", con.connection.name, " HOST: ", con.connection.host);

    } catch (error) {
        console.log("server error: ", error.message)
    }
}

export default connection