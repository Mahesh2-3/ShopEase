# ShopEase - Simple E-Commerce Website

A beginner-friendly, full-stack MERN (MongoDB, Express, React, Node.js) e-commerce
application. Users can register, browse and search products, manage a shopping cart,
and place orders. Admins can manage the product catalog and view/update orders.

## Tech Stack

- **Frontend:** React (Vite), React Router, Context API, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcrypt password hashing

## Project Structure

```
shopease/
├── client/                # React frontend
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Route-level pages
│       ├── context/       # Auth, Cart, Toast context providers
│       ├── services/      # Axios API calls
│       ├── hooks/         # Custom hooks
│       └── utils/         # Helper functions
└── server/                 # Express backend
    ├── controllers/       # Route handler logic
    ├── models/            # Mongoose schemas
    ├── routes/            # Express routers
    ├── middleware/        # Auth, admin, error handling
    ├── config/            # DB connection
    └── seed/              # Sample data seeder
```

## Prerequisites

- Node.js 18+
- A MongoDB database — either:
  - a local MongoDB server (`mongodb://127.0.0.1:27017/shopease`), or
  - a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended if you
    don't want to install MongoDB locally)

## 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and set:

```
MONGO_URI=mongodb://127.0.0.1:27017/shopease   # or your Atlas connection string
JWT_SECRET=some_long_random_string
PORT=5000
CLIENT_URL=http://localhost:5173
```

Seed the database with sample products and an admin account:

```bash
npm run seed
```

This creates 12 sample products and an admin user:

- **Email:** `admin@shopease.com`
- **Password:** `admin123`

Start the backend:

```bash
npm run dev      # with nodemon (auto-restart)
# or
npm start        # plain node
```

The API runs at `http://localhost:5000/api`. Check `GET /api/health` to confirm it's up.

## 2. Frontend Setup

In a new terminal:

```bash
cd client
npm install
cp .env.example .env
```

Edit `client/.env` if your backend runs on a different URL:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## 3. Using the App

- Register a new account, or log in as the seeded admin (`admin@shopease.com` /
  `admin123`) to access the **Admin Dashboard** (`/admin`).
- As a regular user: browse `/products`, search/filter/sort, add items to your cart,
  and check out.
- As an admin: add, edit, and delete products from **Manage Products**, and review all
  customer orders from **Orders**.

## REST API Reference

| Method | Endpoint                  | Access        | Description                    |
|--------|----------------------------|---------------|---------------------------------|
| POST   | /api/auth/register         | Public        | Register a new user            |
| POST   | /api/auth/login             | Public        | Log in, receive a JWT          |
| GET    | /api/auth/profile           | Private       | Get logged-in user's profile   |
| PUT    | /api/auth/profile           | Private       | Update profile / password      |
| GET    | /api/products                | Public        | List products (search/filter/sort/paginate) |
| GET    | /api/products/:id            | Public        | Get a single product           |
| POST   | /api/products                | Admin         | Create a product               |
| PUT    | /api/products/:id            | Admin         | Update a product               |
| DELETE | /api/products/:id            | Admin         | Delete a product                |
| GET    | /api/cart                    | Private       | Get the current user's cart    |
| POST   | /api/cart                    | Private       | Add an item to the cart        |
| PUT    | /api/cart/:id                | Private       | Update an item's quantity      |
| DELETE | /api/cart/:id                | Private       | Remove one item from the cart  |
| DELETE | /api/cart                    | Private       | Clear the entire cart          |
| POST   | /api/orders                  | Private       | Place an order from the cart   |
| GET    | /api/orders                  | Private       | List own orders (all orders for admin) |
| GET    | /api/orders/:id               | Private       | Get a single order              |
| PUT    | /api/orders/:id/status         | Admin         | Update an order's status        |

## Notes

- No payment gateway is integrated (per project requirements) — checkout simply
  records the order and clears the cart.
- State management uses React's Context API only (no Redux).
- Product images use external URLs (placeholders by default) — swap them for your own
  image links, or extend the backend to handle file uploads if you want local image
  storage.
- Passwords are hashed with bcrypt before being stored; JWTs expire after 30 days.

## Deployment Notes

- Set `NODE_ENV=production` on the server for leaner error responses.
- Update `CLIENT_URL` (server) and `VITE_API_URL` (client) to your deployed domains.
- Both `client/` and `server/` are independent projects and can be deployed separately
  (e.g. client on Vercel/Netlify, server on Render/Railway, database on MongoDB Atlas).
