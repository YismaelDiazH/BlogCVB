import { config } from "dotenv";
import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from 'cloudinary';
//import multer from "multer";

const app = express();
config();
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

app.use(express.json());
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb)  {
//     cb(null, "../client/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage});

// app.post("/api/uploads", async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     res.status(200).json({ imageUrl: result.secure_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error uploading image");
//   }
// });

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT

          

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});