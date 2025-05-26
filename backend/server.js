import express from "express";
import dotenv from "dotenv";
import route from "./routes/route.js";
import { connectDb } from "./db/connectDb.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", route);

app.listen(port, () => {
  console.log(`Server Running at port: http://localhost:${port}`);
});
