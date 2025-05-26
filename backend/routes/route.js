import { Router } from "express";
import { handleInput, handleLogin,handleCallback } from "../controllers/moodController.js";

const router = Router();

router.get("/login", handleLogin)
router.get("/callback", handleCallback)
router.post("/input", handleInput);


export default router;