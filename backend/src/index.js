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

// CORS konfiguráció
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // A frontend pontos URL-je
    credentials: true, // Cookie-k és hitelesítési adatok engedélyezése
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
}));

// Route-ok regisztrálása
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Szerver indítása
server.listen(PORT, () => {
    console.log(`megyen ${PORT}`);
    connectDB();
});