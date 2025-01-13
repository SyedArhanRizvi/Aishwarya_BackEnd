import mongoose from "mongoose";

const UserActivitySchema = new mongoose.Schema({
    ipAddress: String,
    timestamp: String,
    userAgent: String,
    page: String
});
export const UserActivity = mongoose.model("UserActivity", UserActivitySchema);