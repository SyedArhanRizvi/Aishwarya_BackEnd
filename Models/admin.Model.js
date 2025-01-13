import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Validation for proper email format
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Validation for phone format
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Enforces minimum password length
    },
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model("AdminModels", adminSchema);