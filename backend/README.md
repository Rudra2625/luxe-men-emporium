
# LUXEMEN Backend API

## Setup Instructions

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values as needed

3. Make sure MongoDB is running on your system

4. Start the development server:
```bash
npm run dev
```

5. (Optional) Seed the database with sample data:
```bash
npm run seed
```

The server will run on http://localhost:1000

## API Endpoints

### Authentication
- POST `/api/user/register` - User registration
- POST `/api/user/login` - User login
- GET `/api/user/profile` - Get user profile (Protected)
- PUT `/api/user/profile` - Update user profile (Protected)

### Products
- GET `/api/products` - Get all products (with filtering & pagination)
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (Admin)
- PUT `/api/products/:id` - Update product (Admin)
- DELETE `/api/products/:id` - Delete product (Admin)
- POST `/api/products/:id/reviews` - Add product review (Protected)

### Orders
- POST `/api/orders` - Create new order (Protected)
- GET `/api/orders` - Get user orders (Protected)
- GET `/api/orders/all` - Get all orders (Admin)
- GET `/api/orders/:id` - Get single order (Protected)
- PUT `/api/orders/:id/status` - Update order status (Admin)
- PUT `/api/orders/:id/cancel` - Cancel order (Protected)

### Health Check
- GET `/api/health` - Check server status

## Sample Data

After running `npm run seed`, you can use these credentials:

**Admin Account:**
- Email: admin@luxemen.com
- Password: admin123

**User Account:**
- Email: john@example.com
- Password: user123

## Project Structure
```
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
├── middleware/
│   ├── auth.js
│   ├── adminAuth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
├── utils/
│   └── seedData.js
├── server.js
└── package.json
```

## Environment Variables

Required environment variables in `.env`:

```
MONGODB_URI=mongodb://localhost:27017/luxemen
JWT_SECRET=your_super_secret_jwt_key_here
PORT=1000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Testing the API

You can test the API using tools like Postman or curl. Make sure to include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```
