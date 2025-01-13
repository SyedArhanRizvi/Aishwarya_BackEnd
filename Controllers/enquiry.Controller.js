import { EnquiryModel } from "../Models/Enquiry.Model.js";
import sendEnquiry from "../Utils/nodemailer.js";
import greetForSendEnquiry from "../Utils/reply.js";

export const enquirySendHandler = async (req, res) => {
  const { email, name, phone, country, message, productOrService } = req.body;
  try {
    if (
      !email ||
      !name ||
      !phone ||
      !message 
    ) {
      console.log(
        "All fields are required ",
        email,
        name,
        phone,
        country,
        message
      );
      return res.status(404).json({ msg: "All fields are required" });
    }
    const enquiryMail = await sendEnquiry(
      email,
      name,
      phone,
      message,
      productOrService,
      country
    );
    console.log(enquiryMail);
    await greetForSendEnquiry(name, email);
    await EnquiryModel.create({ email, name, phone, country, message, productOrService});
    return res.status(201).json({message:"Enquiry Successfully Sent"});
  } catch (error) {
    console.log(
      "There are some errors in your enquirySendHandler plz fix the bugs ",
      error
    );
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const getAllEnquiriesInfo = async (req, res) => {
  try {
  } catch (error) {
    console.log(
      "There are some errors in your getAllEnquiriesInfo plz fix the bugs ",
      error
    );
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
