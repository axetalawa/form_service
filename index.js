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

// Route
app.post("/submit", async (req, res) => {
  const data = req.body;
  console.log("✨ Received submission:", data);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "🌀 New Ritual Form Submission",
      text: JSON.stringify(data, null, 2),
    };

    await transporter.sendMail(message);
    res.json({ status: "ok", message: "Form submitted successfully" });
  } catch (error) {
    console.error("❌ Error handling submission:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("🌿 Ritual Form Service is alive.");
});

app.listen(PORT, () =>
  console.log(`⚙️ Ritual Form Service running on port ${PORT}`)
);
