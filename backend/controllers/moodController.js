import axios from "axios";
import dotenv from "dotenv";
import User from "../models/userSchema.js";

dotenv.config();

export const handleLogin = async (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.REDIRECT_URI,
    scope:
      "user-read-private user-read-email user-top-read user-library-read user-library-modify playlist-read-private playlist-modify-private user-read-recently-played user-read-playback-state user-modify-playback-state streaming app-remote-control user-follow-read playlist-read-collaborative",
    state: "state",
  });

  const authorizeUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  res.redirect(authorizeUrl);
};

export const handleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("Authorization code missing");
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    const profileResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { id, display_name, email } = profileResponse.data;

    const user = new User({
      spotifyId: id,
      accessToken: access_token,
      refreshToken: refresh_token,
      displayName: display_name,
      email: email,
      expiresAt: new Date(Date.now() + expires_in * 1000), // save expiry as datetime
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Spotify login successful",
      user: {
        spotifyId: id,
        displayName: display_name,
        email,
      },
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message });
  }
};

export const handleInput = async (req, res) => {
  const userInput = req.body.input;
  try {
    if (userInput == null || String(userInput).trim() === "") {
      throw new Error("Input is required!!");
    }
    // res.status(200).json({success:true, message:"Input sent to model", userInput});
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
      {
        inputs: userInput,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    const predictions = response.data;
    res.status(200).json({
      success: true,
      message: "Emotion extracted",
      userInput,
      predictions,
    });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
