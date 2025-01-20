import express from "express";
import { addNewActivityModel,getAllUserActivities } from "../Controllers/activity.Controller.js";

const activityRoutes = express.Router();

activityRoutes.post("/addNewActivity", addNewActivityModel);
activityRoutes.get("/getAllUserActivities/:range", getAllUserActivities);
export default activityRoutes;