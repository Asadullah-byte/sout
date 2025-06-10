import { Router } from "express";
import { handleInput, handleLogin,handleCallback,handleGetNasheeds } from "../controllers/moodController.js";
import { ensureSpotifyToken } from "../middleware/spotifyAuth.js";

const router = Router();

router.get("/api/login", handleLogin)
router.get("/api/callback", handleCallback)
router.post("/api/input",ensureSpotifyToken, handleInput);
router.get("/api/nasheeds",ensureSpotifyToken, handleGetNasheeds)

export default router;