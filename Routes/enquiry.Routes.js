import { Router } from "express";
import { enquirySendHandler, getAllEnquiriesInfo, enquiryResolveController, enquiryDeleteController } from "../Controllers/enquiry.Controller.js";

const enquiryRoutes = Router();

enquiryRoutes.post("/post-a-new-enquiry", enquirySendHandler);
enquiryRoutes.put("/enquiry-resolve/:userID", enquiryResolveController);
enquiryRoutes.delete("/enquiry-delete/:userID", enquiryDeleteController);
enquiryRoutes.get("/get-all-prev-enquiries", getAllEnquiriesInfo);

export default enquiryRoutes;