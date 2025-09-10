# SPACIFY - Backend Setup & Login Fix

## 🚨 Network Error Fix

The login network error occurs because the frontend expects a backend API running on `http://localhost:8000`. 

## 🔧 Quick Fix - Start Mock Server

I've created a mock backend server for development. To fix the login issue:

### Option 1: Start Both Frontend & Backend Together
```bash
npm run dev:full
```

### Option 2: Start Servers Separately

**Terminal 1 - Start Mock Backend:**
```bash
npm run mock-server
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

## 👤 Demo Login Credentials

Once the mock server is running, use these credentials to test login:

- **Email:** `user@example.com`
- **Password:** `password123`

## 📋 Mock Server Features

The mock server provides:

- ✅ User authentication (login/register)
- ✅ JWT token simulation
- ✅ Demo user account
- ✅ CORS enabled for frontend
- ✅ Proper error responses
- ✅ Token verification

## 🔍 Server Status Check

To verify the backend is running:
```bash
curl http://localhost:8000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Mock server is running",
  "timestamp": "..."
}
```

## 🎯 Production Backend

For production, you'll need to:

1. **Replace mock server** with a real backend (Node.js, Python, etc.)
2. **Implement proper features:**
   - Password hashing (bcrypt)
   - Real JWT tokens
   - Database integration
   - Parking spot management
   - Booking system
   - Payment processing

3. **Update environment variables:**
   ```bash
   # .env.local
   NEXT_PUBLIC_API_URL=https://your-production-api.com/api
   ```

## 🏗️ Backend Technology Suggestions

**Node.js + Express:**
- Express.js framework
- MongoDB/PostgreSQL database
- JWT authentication
- Stripe for payments

**Python + FastAPI:**
- FastAPI framework
- SQLAlchemy ORM
- PostgreSQL database
- JWT tokens

**Other Options:**
- Supabase (Backend-as-a-Service)
- Firebase (Google)
- AWS AppSync + DynamoDB
- Vercel + PlanetScale

## 🚀 Next Steps

1. Start the mock server: `npm run mock-server`
2. Test login with demo credentials
3. Develop/deploy a real backend
4. Update API_URL in production

## 📞 Mock Server API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/verify` - Token verification
- `POST /api/auth/logout` - User logout
- `GET /api/health` - Server health check

The mock server logs all requests to the console for debugging.
