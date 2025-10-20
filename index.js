// index.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This async function will handle sending the email
async function sendEmail(data) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    const message = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "🌀 New Ritual Form Submission",
      text: JSON.stringify(data, null, 2),
    };

    await transporter.sendMail(message);
    console.log("✅ Email sent successfully for:", data.email);
  } catch (error) {
    console.error("❌ Error sending email in background:", error);
  }
}

// Route
app.post("/submit", (req, res) => {
  const data = req.body;
  console.log("✨ Received submission:", data);

  // 1. Respond to the browser IMMEDIATELY
  res.json({ status: "ok", message: "Form submission received" });

  // 2. Send the email in the background without making the user wait
  sendEmail(data);
});

// Health check
app.get("/", (req, res) => {
  res.send("🌿 Ritual Form Service is alive.");
});

app.listen(PORT, () =>
  console.log(`⚙️ Ritual Form Service running on port ${PORT}`)
);
