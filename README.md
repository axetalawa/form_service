## 🌐 Ritual Form Service — Repository Structure

```
ritual-form-service/
│
├── index.js
├── package.json
├── .env.example
├── README.md
└── railway.toml
```

---

### **1. index.js** — your core Express microservice

```js
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
```

---

### **2. package.json**

```json
{
  "name": "ritual-form-service",
  "version": "1.0.0",
  "description": "A minimal self-hosted form backend for static websites",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "nodemailer": "^6.9.4"
  }
}
```

---

### **3. .env.example**

```
# Copy this to .env and fill in your values

FROM_EMAIL=youremail@gmail.com
TO_EMAIL=youremail@gmail.com
EMAIL_PASS=your_16_char_app_password
PORT=5001
```

*(When deploying to Railway, you’ll put these directly into the environment variables section — the `.env` file is just for local testing.)*

---

### **4. railway.toml**

Railway uses this to know how to start the app.

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "node index.js"
healthcheckPath = "/"
```

---

### **5. README.md**

````markdown
# 🌿 Ritual Form Service

A lightweight self-hosted backend for HTML forms across your static sites.

## ✴ Setup

1. Clone this repo:
   ```bash
   git clone https://github.com/yourusername/ritual-form-service.git
   cd ritual-form-service
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in:

   ```bash
   FROM_EMAIL=youremail@gmail.com
   TO_EMAIL=youremail@gmail.com
   EMAIL_PASS=your_16_char_app_password
   ```

4. Start locally:

   ```bash
   node index.js
   ```

   Visit [http://localhost:5001](http://localhost:5001) — you should see
   `🌿 Ritual Form Service is alive.`

## 🚀 Deploy on Railway

1. Create a new project at [https://railway.app](https://railway.app)
2. Connect this GitHub repo.
3. Add environment variables under the **Variables** tab.
4. Deploy — your endpoint will look like:

   ```
   https://ritual-form-service.up.railway.app/submit
   ```

## 🪶 Example HTML form

```html
<form action="https://ritual-form-service.up.railway.app/submit" method="POST">
  <input name="email" type="email" placeholder="Your email" required>
  <textarea name="message" placeholder="Say something..."></textarea>
  <button type="submit">Send</button>
</form>
```

```
