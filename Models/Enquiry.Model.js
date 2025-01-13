import mongoose from "mongoose";

// Define the schema for enquiry form data
const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^\+?[1-9]\d{1,14}$/,
    },
    country: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    productOrService: {
      type: String,
      trim: true,
    },
    enquiryResolve:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);
export const EnquiryModel = mongoose.model("Enquiry", enquirySchema);