import { Router } from "express";
import { takeInput } from "../controllers/moodController.js";

const router = Router();

router.get("/input-mood", takeInput);


export default router;