# Mercato Ecommerce App

An ecommerce project with a static storefront plus a full Amazon-style authentication system.

## Features

- Responsive product catalog
- Search and category filtering
- Product detail pages
- Product color options
- Discount pricing
- Similar product suggestions
- Demo return request flow
- Client login and account dashboard
- Add-to-cart drawer
- Quantity controls
- Checkout summary
- Cart persistence with local storage
- Netlify-compatible static deployment

## Full-Stack Authentication

The new auth app lives in:

- `frontend/`: HTML, CSS, and JavaScript auth UI
- `backend/`: Node.js, Express, JSON-file user storage, JWT, bcrypt, Passport OAuth
- `backend/routes/`: API routes
- `backend/controllers/`: request handlers
- `backend/models/`: local `users.json` user storage helpers
- `backend/middleware/`: auth, validation, error handling
- `backend/config/`: OAuth configuration

### API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/facebook`
- `GET /api/auth/facebook/callback`
- `GET /api/users/dashboard`

### Install and Run

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Then open:

```text
http://localhost:5000
```

The backend serves `frontend/index.html` as the first page, so the login page opens first.

### User Storage

The backend does not require MongoDB. Users are stored in `backend/users.json`.
The file is created automatically when the server starts or when the first auth request runs.

### OAuth Setup

Google:

1. Create OAuth credentials in Google Cloud Console.
2. Add callback URL: `http://localhost:5000/api/auth/google/callback`
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `backend/.env`.

Facebook:

1. Create an app in Meta for Developers.
2. Add callback URL: `http://localhost:5000/api/auth/facebook/callback`
3. Set `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET` in `backend/.env`.

### Production Notes

- Use HTTPS in production.
- Set a strong `JWT_SECRET`.
- Set `NODE_ENV=production`.
- Set `CLIENT_URL` to your deployed frontend URL.
- Replace the JSON file store with a managed database before using real customer data.
- Configure OAuth callback URLs with your production domain.

## Run locally

Open `index.html` in a browser.

## Deploy to Netlify

Use these Netlify settings:

- Build command: leave empty
- Publish directory: `frontend`

The included `netlify.toml` already sets the publish directory. Netlify static hosting will show the login-first frontend.

Important: Netlify is only serving static frontend files in this project. Signup/login API calls require the Node/Express backend. For local testing, run the backend at `http://127.0.0.1:5000` and the frontend at `http://127.0.0.1:3000`.

For production, deploy `backend/` to a Node host such as Render, Railway, Fly.io, or a VPS. Then set `window.MERCATO_API_URL` in `frontend/assets/config.js`, for example:

```js
window.MERCATO_API_URL = "https://your-backend-domain.com/api";
```

## Product Photos

Product photos are saved locally under `assets/products/`.

- Headphones: https://unsplash.com/photos/gehzL37x6zY
- Desk lamp: https://unsplash.com/photos/4Zk8kiqA8Wk
- Backpack: https://unsplash.com/photos/_H0fjILH5Vw
- Speaker: https://unsplash.com/photos/-WB52caEpmI
- Throw blanket: https://unsplash.com/photos/0xg8ip9ayaA
- Smart watch: https://unsplash.com/photos/Q60A9HDYbkI
