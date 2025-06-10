// utils/spotify.js
import axios from "axios";
import User from "../models/userSchema.js";

export const getValidAccessToken = async (spotifyId) => {
  const user = await User.findOne({ spotifyId });

  if (!user) throw new Error("User not found");

  const now = new Date();

  if (now < user.expiresAt) {
    // Token is still valid
    return user.accessToken;
  }

  // Token expired, refresh it
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: user.refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    user.accessToken = access_token;
    user.expiresAt = new Date(Date.now() + expires_in * 1000);
    await user.save();

    return access_token;
  } catch (err) {
    console.error("Error refreshing token:", err.response?.data || err.message);
    throw new Error("Failed to refresh access token");
  }
};
