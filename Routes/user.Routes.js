import { Router } from "express";
import { adminAccountCreationController, userInfoGettingController } from "../Controllers/user.Controller.js";

const userRoutes = Router();

userRoutes.post("/createAccount", adminAccountCreationController);
userRoutes.get("/userRoutesGetInfo/:userID", userInfoGettingController);


export default userRoutes;