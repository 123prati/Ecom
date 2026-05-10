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
- `backend/`: Node.js, Express, MongoDB, JWT, bcrypt, Passport OAuth
- `backend/routes/`: API routes
- `backend/controllers/`: request handlers
- `backend/models/`: MongoDB schemas
- `backend/middleware/`: auth, validation, error handling
- `backend/config/`: MongoDB and OAuth configuration

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

### MongoDB

Use a local MongoDB instance or MongoDB Atlas. Set this in `backend/.env`:

```text
MONGODB_URI=mongodb://127.0.0.1:27017/mercato_auth
```

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
- Use MongoDB Atlas or a managed MongoDB provider.
- Configure OAuth callback URLs with your production domain.

## Run locally

Open `index.html` in a browser.

## Deploy to Netlify

Use these Netlify settings:

- Build command: leave empty
- Publish directory: `.`

The included `netlify.toml` already sets the publish directory.

## Product Photos

Product photos are saved locally under `assets/products/`.

- Headphones: https://unsplash.com/photos/gehzL37x6zY
- Desk lamp: https://unsplash.com/photos/4Zk8kiqA8Wk
- Backpack: https://unsplash.com/photos/_H0fjILH5Vw
- Speaker: https://unsplash.com/photos/-WB52caEpmI
- Throw blanket: https://unsplash.com/photos/0xg8ip9ayaA
- Smart watch: https://unsplash.com/photos/Q60A9HDYbkI
