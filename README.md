Absolutely — here’s your complete **`README.md`** in one clean, copy-ready block, formatted and spaced exactly as it should appear in your GitHub repo.
You can paste this directly into your `README.md` file.

---

```markdown
# Ritual Form Service

> A minimal self-hosted backend for HTML forms — built with **Express**, **Axios**, and the **Brevo API**.  
> Designed for static websites that need lightweight form handling without third-party plugins.

---

## ✴ Overview

The **Ritual Form Service** accepts submissions from static HTML forms, then relays them through the [Brevo (Sendinblue) transactional email API](https://developers.brevo.com/).  
It is intentionally minimal — a few lines of JavaScript that demonstrate backend logic, environment configuration, API integration, and deployment with [Railway](https://railway.app/).

This project demonstrates:
- RESTful route design with **Express**
- **CORS** and JSON middleware setup
- Secure use of **environment variables**
- Integration with an external API (**Brevo**)
- **Health check endpoint** for deployment monitoring

---

## Repository Structure

```

ritual-form-service/
│
├── index.js          # main Express app
├── package.json      # dependencies and metadata
├── railway.toml      # Railway deploy configuration
├── .env.example      # local environment variable template
└── README.md

````

---

## Setup (Local)

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/ritual-form-service.git
   cd ritual-form-service
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Copy the environment template**

   ```bash
   cp .env.example .env
   ```

4. **Fill in your `.env` values**

   ```bash
   FROM_EMAIL=you@example.com
   TO_EMAIL=you@example.com
   BREVO_PASS=your_brevo_api_key
   PORT=8080
   ```

5. **Run locally**

   ```bash
   node index.js
   ```

   Visit [http://localhost:8080](http://localhost:8080) — you should see
   `🌿 Ritual Form Service is alive (Brevo API version).`

---

## Example HTML Form

You can point any static HTML form to your service endpoint:

```html
<form
  action="https://ritual-form-service.up.railway.app/submit"
  method="POST"
>
  <input name="name" placeholder="Your name" required />
  <input type="email" name="email" placeholder="Your email" required />
  <textarea name="message" placeholder="Say something..."></textarea>
  <button type="submit">Send</button>
</form>
```

---

## Deploy on Railway

1. Go to [Railway.app](https://railway.app)
2. Create a new project and connect this repository.
3. Under **Variables**, add:

   * `FROM_EMAIL`
   * `TO_EMAIL`
   * `BREVO_PASS`
   * `PORT` (optional)
4. Deploy.
   Your production endpoint will look like:

   ```
   https://ritual-form-service.up.railway.app/submit
   ```

The `railway.toml` file already includes:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "node index.js"
healthcheckPath = "/"
```

---

## 🔍 API Reference

### `POST /submit`

Accepts form data (JSON or URL-encoded) and forwards it via the Brevo API.

**Request body**

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "message": "Hello world"
}
```

**Response**

```json
{ "status": "ok", "message": "Email sent successfully" }
```

**Error response**

```json
{ "status": "error", "message": "Email send failed" }
```

### `GET /`

Returns a plain-text health message confirming the service is online.

---

## Environment Variables

| Variable     | Description                                                             |
| ------------ | ----------------------------------------------------------------------- |
| `FROM_EMAIL` | Email address of the sender (e.g., your domain email)                   |
| `TO_EMAIL`   | Destination email address                                               |
| `BREVO_PASS` | API key from [Brevo dashboard](https://app.brevo.com/settings/keys/api) |
| `PORT`       | Port number (default: `8080`)                                           |

---

## Example Log Output

```
✨ Received submission: { name: 'Alice', email: 'alice@example.com', message: 'Hello' }
✅ Email sent via Brevo API: { messageId: 'abc123' }
⚙️ Ritual Form Service running on port 8080
```

---

## License

MIT License © 2025 [Javed Saunja Jaghai](https://javedjaghai.com)
Part of the **Mute Logic Lab** ecosystem.

---

> *A minimal service — a small ritual — connecting static forms to living systems.*

---
