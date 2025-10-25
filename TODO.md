# TODO: Fix Registration and Remove Clerk

## Tasks
- [x] Remove `@clerk/clerk-react` dependency from `frontend/package.json`
- [x] Update `frontend/src/main.jsx` to remove ClerkProvider wrapper
- [x] Update `frontend/src/App.jsx` to remove SignedIn/SignedOut components and simplify PrivateRoute
- [x] Update `frontend/src/context/AuthContext.jsx` to remove Clerk hooks and simplify to custom auth only
- [x] Update `frontend/src/components/Header.jsx` to remove Clerk components and use custom auth
- [x] Reinstall frontend dependencies
- [x] Start backend server
- [x] Test registration functionality
