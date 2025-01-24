import express from "express";
import mongoose from "mongoose";
import dot from "dotenv";
import cors from "cors";
import userRoutes from "./Routes/user.Routes.js";
import enquiryRoutes from "./Routes/enquiry.Routes.js";
import productRoutes from "./Routes/product.Routes.js";
import activityRoutes from "./Routes/activity.Routes.js";
dot.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "D.B Connected Successfully and hosted on port ",
        PORT
      );
    });
})
  .catch((err) => {
    console.log("Some errors in D.B Connection ", err);
});

app.use("/server/routes/userRoutes", userRoutes);
app.use("/server/routes/enquiryRoutes", enquiryRoutes);
app.use("/server/routes/productRoutes", productRoutes);
app.use("/server/routes/activityRoutes", activityRoutes);