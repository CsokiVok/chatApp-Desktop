import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB);
    }catch(e){
        console.log(e)
    }
}