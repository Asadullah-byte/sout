import { getValidAccessToken } from "../utils/spotify.js";

export const ensureSpotifyToken = async (req, res, next) => {
    try {
        const {spotifyId} = req.body;
        if(!spotifyId) return res.status(400).json({success:false, message: "Missing spotifyId"});
        req.accessToken = await getValidAccessToken(spotifyId);
        next();
    } catch (err) {
         console.error("Token refresh failed:", err);
    res.status(401).json({ success: false, message: err.message });
    }
}