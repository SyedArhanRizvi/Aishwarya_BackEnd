import nodemailer from "nodemailer";
import dot from "dotenv";
dot.config();
const sendEnquiry = async (userEmail, userName, userPhone, userMessage, lookingFor, country) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 587, // Use 465 for secure connections
            secure: false,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASS,
            },
        });
        await transporter.verify();
        console.log("SMTP server is ready to accept messages.");
        const emailTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <div style="background: #006400; color: #fff; text-align: center; padding: 20px;">
                    <h1 style="margin: 0;">Aishwarya Foods and Export</h1>
                    <p style="font-size: 1.2rem; margin: 5px 0;">New Enquiry Received</p>
                </div>
                <div style="padding: 20px; background: #f9f9f9;">
                    <p><strong>Dear Team,</strong></p>
                    <p>You have received a new enquiry from <strong>${userName}</strong>. Here are the details:</p>
                    <ul style="list-style: none; padding: 0;">
                        <li><strong>Name:</strong> ${userName}</li>
                        <li><strong>Email:</strong> ${userEmail}</li>
                        <li><strong>Phone:</strong> ${userPhone}</li>
                        <li><strong>Looking For:</strong> ${lookingFor}</li>
                         <li><strong>Origin From:</strong> ${country}</li>
                    </ul>
                    <p><strong>Message:</strong></p>
                    <p style="font-style: italic; background: #f4f4f4; padding: 10px; border-radius: 5px;">${userMessage}</p>
                    <p>Please reach out to them promptly to address their enquiry.</p>
                </div>
            </div>
        `;
        const mailOptions = {
            from: userEmail,
            to: process.env.MY_EMAIL,
            subject: `New Enquiry Received For - ${lookingFor}`,
            html: emailTemplate,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Enquiry sent successfully! Enquiry ID: ${info.messageId}`);

        return {
            success: true,
            message: `Thank you for reaching out, ${userName}. Your enquiry has been sent successfully. Our team will contact you shortly.`,
        };
    } catch (error) {
        console.error("Error in sendEnquiry handler:", error);
        const errorMessage = error.response
            ? `SMTP Response: ${error.response}`
            : error.message;

        return {
            success: false,
            message: `Failed to send your enquiry. Please check your details or try again later. Error: ${errorMessage}`,
        };
    }
};

export default sendEnquiry;
