# CHANGELOG.md — Commit Story of the Ritual Form Service

> *A small backend, written as a ritual of correspondence — between form and field, browser and body.*

---

## Phase I — Conception (July 2025)

**Objective:**  
Create a lightweight backend to handle contact form submissions from static sites — self-hosted, serverless-friendly, and easy to replicate.

**Key work**
- Defined core stack: **Express**, **CORS**, **Axios**, **Node.js (ES modules)**.  
- Implemented `/submit` route with JSON body parsing.  
- Added `/` health check endpoint for Railway deployment.  
- Logged incoming data for debugging and verification.

**Artifacts**
- `index.js` — minimal Express service
- `package.json` — project metadata and dependencies
- `railway.toml` — deployment configuration

**Decisions**
- Use **Brevo API** instead of SMTP for simplicity and delivery reliability.  
- Keep the service **stateless** and portable — deployable anywhere Node runs.  
- Prioritize code clarity and readability over abstraction.

---

## Phase II — Brevo API Integration (August 2025)

**Objective:**  
Replace Nodemailer with **direct HTTP calls to Brevo’s transactional API** for more predictable delivery and lower latency.

**Key work**
- Configured POST request to `https://api.brevo.com/v3/smtp/email` using `axios`.  
- Set request headers and payload dynamically via environment variables.  
- Structured message template (name, email, message).  
- Implemented error handling with verbose console output.

**Artifacts**
- `index.js` updated with Brevo request handler.  
- `.env.example` created to standardize configuration.

**Decisions**
- Treat `.env.example` as canonical — same structure for local and production.  
- Log successful sends and errors clearly for CI/CD observability.  
- Reserve `/` route for Railway’s `healthcheckPath` to simplify deploy logs.

---

## Phase III — Railway Deployment (September 2025)

**Objective:**  
Deploy a working prototype to [Railway](https://railway.app) and validate cross-domain communication from static sites.

**Key work**
- Added `railway.toml` for build and deploy instructions.  
- Verified **CORS** configuration to allow requests from multiple domains.  
- Tested response structure with live HTML forms hosted on Vercel.  
- Adjusted default port to `8080` for consistency.

**Artifacts**
- `railway.toml` with `NIXPACKS` builder and deploy command.  
- Working endpoint at  
  `https://ritual-form-service.up.railway.app/submit`

**Decisions**
- Keep the service monolithic (single file) until complexity demands modularization.  
- Use Railway’s environment variable manager instead of `.env` files in production.

---

## Phase IV — Documentation & Example (October 2025)

**Objective:**  
Make the project publicly readable and reproducible by any developer in minutes.

**Key work**
- Authored `README.md` with clear sections for setup, deployment, and API reference.  
- Added example HTML form and `.env.example`.  
- Created consistent command syntax and endpoint URLs.  
- Embedded aesthetic and philosophical framing within professional documentation tone.

**Artifacts**
- `README.md` (finalized)
- `.env.example` (template for local use)

**Decisions**
- Prioritize **clarity + coherence** over verbosity.  
- Keep the README self-contained — no external dependencies or subdocs required.  
- Frame the service as part of the broader **Mute Logic Lab** ecosystem.

---

## Phase V — Refinement & Future Trajectory (October 2025)

**Objective:**  
Prepare for small extensions and production hardening.

**Key work**
- Verified logging consistency and tested Brevo edge cases.  
- Finalized documentation (README + CHANGELOG).  
- Reviewed deployment pipeline for deterministic rebuilds.

**Next steps**
- [ ] Add optional **rate limiting** or **reCAPTCHA** for spam prevention.  
- [ ] Add **request origin logging** to verify domain integrity.  
- [ ] Implement lightweight monitoring (`/health` JSON response).  
- [ ] Add minimal unit test for `/submit` route using Jest or Mocha.

---

## Coda

> *Every form is an invocation.  
> Every submission, a brief message to the unseen systems that listen.*

---

**Authored by**: [Javed Saunja Jaghai](https://javedjaghai.com)  
**Lab**: Mute Logic Lab — Salvador, Bahia (2025)  
**License**: MIT
