# TODO: Fix Authentication and CORS Issues

## Backend Fixes
- [ ] Standardize login response in `backend/routes/auth.js` to match register format
- [ ] Fix JWT_SECRET fallback in `backend/controllers/usercontroller.js`
- [ ] Ensure consistent user ID usage (use `user.id`)
- [ ] Update CORS in `backend/server.js` to allow all origins for development

## Frontend Fixes
- [ ] Fix register API response handling in `frontend/src/services/api.js`
- [ ] Update AuthContext register destructuring in `frontend/src/context/AuthContext.jsx`
- [ ] Test authentication flow after fixes

## Testing
- [ ] Run backend and frontend
- [ ] Test login and register functionality
- [ ] Verify no CORS errors
