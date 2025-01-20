import mongoose from "mongoose";

const UserActivitySchema = new mongoose.Schema({
    ipAddress: String,
    timestamp: String,
    userAgent: String,
    page: String
}, {timestamps:true});
export const ActivityModel = mongoose.model("ActivityModel", UserActivitySchema);