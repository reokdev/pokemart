# PokéMart Technical Documentation

**CONFIDENTIAL - INTERNAL USE ONLY**

## Architecture Overview

PokéMart is built using a modern web stack with the following key components:

### Frontend
- Next.js 15 (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn UI for component library
- React Server Components for optimal performance

### Backend
- Next.js API Routes
- Neon PostgreSQL Database
- Clerk Authentication
- Server Actions for form handling

### Infrastructure
- Vercel deployment
- Neon serverless PostgreSQL
- Edge Functions for API routes
- CDN for static assets

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  condition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Grading Submissions Table
```sql
CREATE TABLE grading_submissions (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  card_name TEXT NOT NULL,
  set_name TEXT NOT NULL,
  service_level TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Authentication Flow

1. Clerk handles user authentication
2. Middleware protects non-public routes
3. User sessions are managed via Clerk's session management
4. Protected routes require valid session

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get single product
- `POST /api/products` (protected) - Create product
- `PUT /api/products/[id]` (protected) - Update product
- `DELETE /api/products/[id]` (protected) - Delete product

### Orders
- `POST /api/orders` (protected) - Create order
- `GET /api/orders` (protected) - List user's orders
- `GET /api/orders/[id]` (protected) - Get order details

### Grading
- `POST /api/grading` (protected) - Submit grading request
- `GET /api/grading` (protected) - List user's submissions
- `GET /api/grading/[id]` (protected) - Get submission details

## Webhook Integration

### Payment Processing
- Webhook endpoint: `/api/webhook/payment`
- Handles payment confirmation
- Updates order status
- Triggers email notifications

### Shipping Updates
- Webhook endpoint: `/api/webhook/shipping`
- Updates tracking information
- Updates order status
- Triggers customer notifications

### Grading Updates
- Webhook endpoint: `/api/webhook/grading`
- Updates grading submission status
- Triggers status update notifications

## Security Measures

1. All database queries use parameterized statements
2. Authentication state is verified on all protected routes
3. CORS is properly configured
4. Rate limiting is implemented on API routes
5. Input validation on all form submissions
6. XSS protection via Next.js built-in security
7. CSRF protection via Clerk tokens

## Monitoring & Logging

- Error tracking via server-side logging
- Performance monitoring via Vercel Analytics
- Database query monitoring via Neon dashboard
- Authentication monitoring via Clerk dashboard

## Deployment Process

1. Code changes are pushed to main branch
2. Vercel automatically builds and deploys
3. Database migrations are handled manually
4. Environment variables are managed via Vercel

---

© 2025 PokéMart. All Rights Reserved.
This document is confidential and proprietary. 