import express from "express";
import cors from "cors"; 
import { config } from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';

const app = express();
config();
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
          

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});