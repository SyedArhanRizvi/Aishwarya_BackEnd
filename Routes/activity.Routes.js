import express from "express";
import { addNewUserActivity,getAllUserActivities } from "../Controllers/activity.Controller.js";

const activityRoutes = express.Router();

activityRoutes.post("/addNewActivity", addNewUserActivity);
activityRoutes.get("/getAllUserActivities", getAllUserActivities);
export default activityRoutes;