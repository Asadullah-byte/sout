import express from 'express';
import dotenv from 'dotenv'
import route from "./routes/route.js"


dotenv.config();
const app = express();
const port =process.env.PORT || 3000 ;

app.use(express.json());

app.use("/", route);

app.listen(port, () => {
    console.log(`Server Running at port: http://localhost:${port}`);
})