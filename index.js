import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

import axios from "axios";

app.post("/submit", async (req, res) => {
  const data = req.body;
  console.log("✨ Received submission:", data);

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Premordia Contact", email: process.env.FROM_EMAIL },
        to: [{ email: process.env.TO_EMAIL }],
        subject: "🌀 New Ritual Form Submission",
        textContent: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_PASS,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent via API:", response.data);
    res.json({ status: "ok", message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email send failed:", err.response?.data || err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.get("/", (req, res) => res.send("🌿 Ritual Form Service is alive."));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`⚙️ Ritual Form Service running on port ${PORT}`));
