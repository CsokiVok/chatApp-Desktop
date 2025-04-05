import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.js";
import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const users = await User.find({_id: {$ne:loggedInUser}}).select("-password") //összes user magunkon kívül, jelszót nem küldjük vissza a clientnek

        res.status(200).json(users)
    } catch (error) {
        console.log("getUsers error (controller message.js)", error.message)
        res.status(500).json({error: "Internal server error"})
    }
};

export const getMessages = async(req, res) => {
    try {
        const {id} = req.params
        const myId = req.user._id //a jelenleg authentikált user

        //összes üzenet egy másik userrel
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:id},
                {senderId:id, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("getMessages error (controller message.js)", error.message)
        res.status(500).json({error: "Internal server error"})
    }
};

export const sendMessage = async(req, res) => {
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params; //fogadó
        const senderId = req.user._id; //küldő

        //hogyha van image akkor feltöltjük a cloudinarybe
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage) // privát chat, csak egy embernek megy az üzenet
        }

        

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("sendMessage error (controller message.js)", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}