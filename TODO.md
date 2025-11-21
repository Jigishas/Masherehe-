# TODO: Fix Authentication and CORS Issues

## Backend Fixes
- [x] Standardize login response in `backend/routes/auth.js` to match register format
- [x] Fix JWT_SECRET fallback in `backend/controllers/usercontroller.js`
- [x] Ensure consistent user ID usage (use `user.id`)
- [x] Update CORS in `backend/server.js` to allow all origins for development

## Frontend Fixes
- [x] Fix register API response handling in `frontend/src/services/api.js`
- [x] Update AuthContext register destructuring in `frontend/src/context/AuthContext.jsx`
- [x] Test authentication flow after fixes

## Testing
- [x] Run backend and frontend
- [x] Test login and register functionality
- [x] Verify no CORS errors
