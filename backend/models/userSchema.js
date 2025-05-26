import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  spotifyId: String,
  accessToken: String,
  refreshToken: String,
  displayName: String,
  email: String,
  expiresAt: Date,
});

const User = mongoose.model("User", userSchema);
export default User;
