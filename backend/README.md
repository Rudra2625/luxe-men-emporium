
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

The server will run on http://localhost:1000

## API Endpoints

### Health Check
- GET `/api/health` - Check server status

### Future Endpoints (to be implemented)
- POST `/api/user/register` - User registration
- POST `/api/user/login` - User login
- GET `/api/products` - Get all products
- POST `/api/products` - Create product (admin)
- GET `/api/orders` - Get user orders
- POST `/api/orders` - Create new order

## Project Structure
```
backend/
├── config/
│   └── database.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/          (to be created)
├── routes/          (to be created)
├── controllers/     (to be created)
├── server.js
└── package.json
```
