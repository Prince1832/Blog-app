# Blog App – Full-Stack Blog Platform with Admin Dashboard

A modern full-stack blog application built using **Next.js**, **MongoDB**, **Tailwind CSS**, and **JWT-based authentication**. This platform allows admins to create, manage, and delete blog posts with a secure login system and rich-text editor.

---

## Features

-  Beautiful, responsive UI with Tailwind CSS
-  JWT-based authentication for secure admin access
-  Rich text editor (React Quill) for writing blog content
-  Blog post management (Create, Edit, Delete)
-  Protected admin routes using middleware
-  SEO-friendly with dynamic `<title>` and meta tags
-  Integrated Google Analytics
-  Blog post slugs and dynamic routing
-  Fully deployed on Vercel

---

## Folder Structure

```bash
src/
├── components/       
├── lib/              
├── pages/          
│   ├── api/          
│   ├── admin/      
│   ├── blog/        
│   └── index.tsx      
├── styles/           
public/
├── favicon.ico 


## Tech Stack

---Frontend: Next.js 15, React, Tailwind CSS

---Backend: Node.js (API routes), MongoDB with Mongoose

---Auth: JWT (JSON Web Token)

---Editor: React Quill

---Deployment: Vercel

---Analytics: Google Analytics

## Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/Blog-app.git
cd Blog-app


2. Install dependencies
bash
Copy
Edit
npm install


3. Configure environment variables
Created a .env.local file in the root and added:

-MONGODB_URI=your_mongodb_connection_string
-JWT_SECRET=your_custom_secret_key
-NEXT_PUBLIC_BASE_URL=http://localhost:3000
-

4. Run the development server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 to access the app.

## Admin Access
--To access the admin panel:

--Register via /register

--Login via /login

You’ll be redirected to /admin for post management

## Only logged-in users with valid tokens can access the admin routes.

##Deployment
--Deployed on Vercel:

--Production URL: https://blog-app-five-ochre.vercel.app/


## Google Analytics
--This project uses Google Analytics (GA4) for tracking.

--Replace the G-xxxxxxx in _app.tsx with your own GA4 Measurement ID to enable tracking.
