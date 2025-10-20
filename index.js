import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// 🌀 Ritual Form Service — Brevo API version
app.post("/submit", async (req, res) => {
  const data = req.body;
  console.log("✨ Received submission:", data);

  try {
    // Compose and send through Brevo HTTP API
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

    console.log("✅ Email sent via Brevo API:", response.data);
    res.json({ status: "ok", message: "Email sent successfully" });
  } catch (err) {
    console.error(
      "❌ Email send failed:",
      err.response?.data || err.message || err
    );
    res.status(500).json({ status: "error", message: "Email send failed" });
  }
});

// Simple health check route
app.get("/", (req, res) => {
  res.send("🌿 Ritual Form Service is alive (Brevo API version).");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`⚙️ Ritual Form Service running on port ${PORT}`));
