import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },

        name:{
            type: String,
            required: true
        },

        password:{
            type: String,
            required: true,
            minlength: 8,
        },

        profilePic:{
            type: String,
            default: "",
        },
        banned: {
            type: Boolean,
            default: false, 
        },
    },{
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema); 

export default User