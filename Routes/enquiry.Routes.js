import { Router } from "express";
import { enquirySendHandler, getAllEnquiriesInfo } from "../Controllers/enquiry.Controller.js";

const enquiryRoutes = Router();

enquiryRoutes.post("/post-a-new-enquiry", enquirySendHandler);
enquiryRoutes.get("/get-all-prev-enquiries", getAllEnquiriesInfo);

export default enquiryRoutes;