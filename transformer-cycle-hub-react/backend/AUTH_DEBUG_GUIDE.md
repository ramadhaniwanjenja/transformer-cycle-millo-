# Authentication Debug Guide

## ✅ Backend Status: WORKING
The backend authentication system is functioning correctly. All tests pass:
- User registration ✅
- User login ✅
- Password validation ✅
- Token generation ✅

## 🔍 Frontend Debugging Steps

### Step 1: Check Browser Developer Tools
1. Open your browser's Developer Tools (F12)
2. Go to the **Network** tab
3. Try to sign in
4. Look for the login request and check:
   - **Request URL**: Should be `http://localhost:3005/api/auth/login`
   - **Request Method**: Should be `POST`
   - **Request Payload**: Should contain `email` and `password`
   - **Response Status**: Should be `200` for success

### Step 2: Check Console for Errors
1. Go to the **Console** tab in Developer Tools
2. Look for any JavaScript errors
3. Common issues:
   - CORS errors
   - Network errors
   - JavaScript syntax errors

### Step 3: Verify API Endpoint
Test the login endpoint directly:
```bash
curl -X POST http://localhost:3005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"your-password"}'
```

### Step 4: Check Frontend Configuration
Make sure your frontend is:
1. **Connecting to the right backend URL**
2. **Sending the correct request format**
3. **Handling the response properly**

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Symptoms**: Browser shows CORS error in console
**Solution**: Check that `CORS_ORIGIN` in `config.env` matches your frontend URL

### Issue 2: Network Error
**Symptoms**: Request fails to reach server
**Solution**: 
- Verify backend is running on port 3005
- Check if frontend is using correct API URL

### Issue 3: Wrong Request Format
**Symptoms**: Server returns 400 error
**Solution**: Ensure frontend sends:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Issue 4: Token Not Stored
**Symptoms**: Login succeeds but user gets logged out
**Solution**: Check if frontend properly stores the JWT token

## 🧪 Test Your Frontend

### Test 1: Direct API Call
```javascript
// In browser console
fetch('http://localhost:3005/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'your-email@example.com',
    password: 'your-password'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

### Test 2: Check Backend Health
```javascript
// In browser console
fetch('http://localhost:3005/api/health')
.then(response => response.json())
.then(data => console.log(data));
```

## 📋 Debug Checklist

- [ ] Backend server is running on port 3005
- [ ] Frontend is making requests to correct URL
- [ ] No CORS errors in browser console
- [ ] Request payload contains email and password
- [ ] Response contains accessToken and refreshToken
- [ ] Frontend stores tokens properly
- [ ] Frontend redirects after successful login

## 🆘 Still Having Issues?

If you're still having trouble, please provide:
1. **Browser console errors** (screenshot or text)
2. **Network tab details** for the login request
3. **Frontend code** that handles the login
4. **Any error messages** you see

This will help identify the specific issue! 