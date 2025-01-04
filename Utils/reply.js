import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const greetForSendEnquiry = async (userName, userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, 
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
          <h1 style="margin: 0;">Welcome to Aishwarya Foods and Export</h1>
          <p style="font-size: 1.2rem; margin: 5px 0;">We appreciate your interest in our services</p>
        </div>
        <div style="padding: 20px; background: #f9f9f9;">
          <p><strong>Dear ${userName},</strong></p>
          <p>Thank you for reaching out to us! We are thrilled to receive your enquiry and look forward to serving your needs.</p>
          
          <h3 style="color: #006400;">Who We Are</h3>
          <p>
            At <strong>Aishwarya Foods and Export</strong>, we specialize in providing high-quality agricultural products and export services. 
            With years of experience in the food export industry, we ensure top-notch quality, timely deliveries, and unmatched customer satisfaction.
          </p>

          <h3 style="color: #006400;">What We Offer</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Fresh Vegetables:</strong> Locally sourced and organically grown produce.</li>
            <li><strong>Exotic Fruits:</strong> Seasonal and high-quality fruits.</li>
            <li><strong>Export Services:</strong> Reliable and professional logistics for international trade.</li>
            <li><strong>Custom Solutions:</strong> Tailored products and services to meet your unique needs.</li>
          </ul>

          <h3 style="color: #006400;">Why Choose Us?</h3>
          <ul style="list-style: none; padding: 0;">
            <li>✅ Trusted by clients worldwide.</li>
            <li>✅ Stringent quality control measures.</li>
            <li>✅ Ethical and sustainable sourcing practices.</li>
            <li>✅ Dedicated customer support team.</li>
          </ul>

          <p>We have received your enquiry and will respond promptly to provide further details or assistance.</p>
          <p>If you have additional questions, please don't hesitate to reach out to us at <a href="mailto:${process.env.MY_EMAIL}" style="color: #006400;">${process.env.MY_EMAIL}</a>.</p>
        </div>
        <div style="text-align: center; background: #006400; color: #fff; padding: 10px;">
          <p style="margin: 0;">Aishwarya Foods and Export</p>
          <p style="margin: 0;">Committed to Quality, Excellence, and Trust</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Aishwarya Foods and Export" <${process.env.MY_EMAIL}>`,
      to: userEmail,
      subject: "Thank You for Your Enquiry",
      html: emailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Acknowledgment email sent successfully! Message ID: ${info.messageId}`);

    return {
      success: true,
      message: `Thank you, ${userName}! Your enquiry acknowledgment has been sent to ${userEmail}.`,
    };
  } catch (error) {
    console.error("Error in greetForSendEnquiry handler:", error);
    return {
      success: false,
      message: `Failed to send acknowledgment email. Please try again later.`,
    };
  }
};

export default greetForSendEnquiry;
