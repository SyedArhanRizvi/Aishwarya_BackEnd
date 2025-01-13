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
    const allEnquiriesInfo = await EnquiryModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({allEnquiriesInfo});
  } catch (error) {
    console.log(
      "There are some errors in your getAllEnquiriesInfo plz fix the bugs ",
      error
    );
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const enquiryResolveController = async (req, res)=>{
  const {userID} = req.params;
  try {
    const enquiryResolve = await EnquiryModel.findByIdAndUpdate(userID, {enquiryResolve:true});
    return res.status(201).json({message:"Enquiry has been resolved"});
  } catch (error) {
    console.log("There are some errors in enquiryResolveController ", error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}
export const enquiryDeleteController = async (req, res)=>{
  const {userID} = req.params;
  try {
    const enquiryDelete = await EnquiryModel.findByIdAndDelete( userID );
    return res.status(201).json({message:"Enquiry has been deleted"});
  } catch (error) {
    console.log("There are some errors in enquiryDeleteController ", error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}