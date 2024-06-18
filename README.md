## Biriyani Ordering Website
![Screenshot (2)](https://github.com/coops15/biriyanionly/assets/137200668/6e4c6b06-0e77-499a-8419-a600c29e952c)

Welcome to the Biriyani Ordering Website repository! This project is a full-featured e-commerce platform for ordering biriyani, built with Next.js, MongoDB, Firebase, Tailwind CSS, and Google Authentication for login/logout.

<h3>Table of Contents</h3>

Features

Technologies Used

Installation

Usage

<h4>Features</h4>

User authentication with Google using Firebase

Responsive UI with Tailwind CSS

Product management with MongoDB

Image storage with Firebase

Dynamic product listings

Add to cart functionality

Secure checkout process

<h4>Technologies Used</h4>

Next.js: A React framework for server-side rendering and static site generation.

MongoDB: A NoSQL database for storing product data.

Firebase: Used for storing images and user authentication.

Tailwind CSS: A utility-first CSS framework for styling.

Google Authentication: Secure login/logout with Google accounts.
![Screenshot (5)](https://github.com/coops15/biriyanionly/assets/137200668/f5a12d22-3981-475b-9291-c01ecd18d236)

Installation:

```bash
git clone https://github.com/your-username/biriyanionly.git
cd biriyanionly
```
```bash
npm install
```
```bash
MONGO_URL="your_mongodb_connection_string"
NEXTAUTH_URL="http://localhost:3000/"
SECRET="your_secret_key"

GOOGLE_OAUTH_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_OAUTH_CLIENT_SECRET="your_google_oauth_client_secret"

```
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

<h4>Usage</h4>

![Screenshot (4)](https://github.com/coops15/biriyanionly/assets/137200668/baa7e50d-f9ba-4a0b-846d-01343e029bc5)

Navigate through the product listings to find your favorite biriyani.

Add items to your cart.

Use the secure checkout process to place your order.

Log in and log out using Google authentication.

