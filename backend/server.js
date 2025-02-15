import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import eventRoutes from "./routes/event.route.js";
import authRoutes from "./routes/login.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () =>{
    connectDB();
    console.log("Server started at port " + PORT);
    console.log("Environment variables loaded:");
    console.log("JWT_SECRET configured:", !!process.env.JWT_SECRET);
    console.log("MONGODB_URI configured:", !!process.env.MONGO_URI);
});