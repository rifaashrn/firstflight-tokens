# First Flight Couriers Token Management System

**Author:** Rifa Sherin  
**Tech:** Next.js, React, PostgreSQL, Prisma, Node.js  

---

## Overview
A simple web app to manage courier tokens. Customers can generate tokens for Pickup, Delivery, or Inquiry, each with a QR code. Staff can view and manage tokens in real-time.  

---

## Features
**Customer Page:**  
- Select service type (Pickup, Delivery, Inquiry)  
- Generate token and view QR code  
- Generate new token  

**Staff Page:**  
- View current tokens (`/staff` in browser)  
- Mark tokens as called/completed  
- Real-time updates  

**Database:**  
- PostgreSQL stores tokens  
- Prisma for DB connection

---

## How to Run
```bash
npm install
npm run dev
Open http://localhost:3000
Staff page: http://localhost:3000/staff
