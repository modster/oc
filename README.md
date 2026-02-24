# OC App

A GCP OAuth application built with [Hono](https://hono.dev/) and [Deno](https://deno.com/). Supports Google OAuth 2.0 sign-in and includes a homepage, Terms of Service page, and Privacy Policy page.

## Features

- 🔐 **Google OAuth 2.0** sign-in via GCP credentials
- 🏠 **Homepage** — displays a welcome message and user info when signed in
- 📄 **Terms of Service** page
- 🔒 **Privacy Policy** page
- 🍪 **Secure, signed session cookies** (HMAC-SHA-256)
- ⚡ **Hono** framework on **Deno** runtime

## Prerequisites

- [Deno](https://deno.com/) v1.40+
- A Google Cloud project with an OAuth 2.0 **Web application** credential

## GCP OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Create a new **OAuth 2.0 Client ID** (type: **Web application**).
3. Add `http://localhost:8000/auth/callback` to **Authorized redirect URIs**.
4. Copy the **Client ID** and **Client Secret**.

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/modster/oc.git
cd oc

# 2. Copy example env file and fill in your credentials
cp .env.example .env
# Edit .env with your GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, etc.

# 3. Start the development server
deno task dev
```

The server will start at `http://localhost:8000`.

## Environment Variables

| Variable              | Description                                      | Default                        |
|-----------------------|--------------------------------------------------|--------------------------------|
| `GOOGLE_CLIENT_ID`    | OAuth 2.0 Client ID from GCP                     | *(required for login)*         |
| `GOOGLE_CLIENT_SECRET`| OAuth 2.0 Client Secret from GCP                 | *(required for login)*         |
| `APP_URL`             | Base URL of the application                      | `http://localhost:8000`        |
| `SESSION_SECRET`      | Secret key used to sign session cookies          | `dev-secret-change-in-production` |
| `PORT`                | Port to listen on                                | `8000`                         |

## Project Structure

```
.
├── main.ts                    # Entry point — Hono app setup
├── deno.json                  # Deno project config & import map
├── .env.example               # Example environment variables
└── src/
    ├── middleware/
    │   └── session.ts         # Signed session cookie middleware
    └── routes/
    │   ├── auth.ts            # /auth/login, /auth/callback, /auth/logout
    │   ├── index.tsx          # / homepage route
    │   ├── tos.tsx            # /tos route
    │   └── privacy.tsx        # /privacy route
    └── views/
        ├── layout.tsx         # Shared HTML layout with nav & footer
        ├── home.tsx           # Homepage view
        ├── tos.tsx            # Terms of Service view
        └── privacy.tsx        # Privacy Policy view
```

## Available Tasks

```bash
deno task start   # Run the app
deno task dev     # Run with file watching
```

## License

MIT