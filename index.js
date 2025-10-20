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

app.post("/submit", async (req, res) => {
  const data = req.body;
  console.log("✨ Received submission:", data);

  try {
    const info = await transporter.sendMail({
      from: `"Premordia Contact" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: "🌀 New Ritual Form Submission",
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });

    console.log("✅ Email sent:", info);
    res.json({ status: "ok", message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email send failed:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.get("/", (req, res) => res.send("🌿 Ritual Form Service is alive."));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`⚙️ Ritual Form Service running on port ${PORT}`));
