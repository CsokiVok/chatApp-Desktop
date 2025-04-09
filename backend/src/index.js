import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

// Adatküldési méret limit beállítása (egyszer!)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS 
app.use(cookieParser());
app.use(cors({
    origin: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

// Route-ok regisztrálása
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Szerver indítása
server.listen(PORT, () => {
    console.log(`megyen ${PORT}`);
    connectDB();
});