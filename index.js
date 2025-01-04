import express from "express";
import mongoose from "mongoose";
import dot from "dotenv";
import cors from "cors";
import userRoutes from "./Routes/user.Routes.js";
import enquiryRoutes from "./Routes/enquiry.Routes.js";
dot.config();

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "D.B Connected Successfully and hosted on port ",
        process.env.PORT
      );
    });
})
  .catch((err) => {
    console.log("Some errors in D.B Connection ", err);
});

app.use("/server/routes/userRoutes", userRoutes);
app.use("/server/routes/enquiryRoutes", enquiryRoutes);