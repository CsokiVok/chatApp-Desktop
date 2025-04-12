import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.js";
import User from "../models/user.js";

// Üzenetek lekérdezése
export const getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const myId = req.user._id;

        // Összes üzenet egy másik userrel
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: id },
                { senderId: id, receiverId: myId },
            ],
        });

        // Időbélyegek formázása
        const formattedMessages = messages.map((message) => ({
            ...message.toObject(),
            createdAt: new Date(message.createdAt).toLocaleString("hu-HU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
        }));

        res.status(200).json(formattedMessages);
    } catch (error) {
        console.log("getMessages error (controller message.js)", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Üzenet küldése
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
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
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", {
                ...newMessage.toObject(),
                createdAt: new Date(newMessage.createdAt).toLocaleString("hu-HU", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            });
        }

        res.status(201).json({
            ...newMessage.toObject(),
            createdAt: new Date(newMessage.createdAt).toLocaleString("hu-HU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
        });
    } catch (error) {
        console.log("sendMessage error (controller message.js)", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Felhasználók lekérdezése
export const getUsers = async (req, res) => {
    try {
        // Felhasználók lekérdezése az adatbázisból
        const users = await User.find({}, { password: 0 }); // Jelszó kihagyása a válaszból
        res.status(200).json(users);
    } catch (error) {
        console.error("getUsers error (controller message.js):", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};