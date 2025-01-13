import { AdminModel } from "../Models/admin.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminAccountCreationController = async (req, res) => {
  const { email, username, fullName, phone, password } = req.body;

  try {
    // Check if the email, username, or phone already exists
    const existingAdmin = await AdminModel.findOne({
      $or: [{ email: email }, { username: username }, { phone: phone }],
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Email, username, or phone already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new AdminModel({
      email,
      username,
      fullName,
      phone,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET, // Use an environment variable for the secret key
      { expiresIn: "2y" } // Token valid for 2 years
    );

    // Save the token in cookies
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      maxAge: 2 * 365 * 24 * 60 * 60 * 1000, // 2 years in milliseconds
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      admin: {
        email: newAdmin.email,
        username: newAdmin.username,
        fullName: newAdmin.fullName,
        phone: newAdmin.phone,
        createdAt: newAdmin.createdAt,
      },
      token,
    });
  } catch (error) {
    console.log("Some Errors in adminAccountCreationController: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to create admin account",
      error: error.message,
    });
  }
};

export const userInfoGettingController = async (req, res) => {
  const { userID } = req.user;
  try {
  } catch (error) {}
};
