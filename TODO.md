# Task: Fix auth flow to open dashboard directly or skip sign-in redirects

## Steps:
- [x] Step 1: Update src/app/page.tsx to client-side page with auth-aware redirect (if user, dashboard; else sign-in).

- [x] Step 2: Verify/test mock auth in lib/auth/client.ts (already returns demo user).
- [x] Step 3: Test the app - load root should go to dashboard directly.
- [x] Step 4: Complete task.

**Status:** ✅ Task complete! Root page now uses client-side auth check to redirect directly to dashboard (since mock user always auth'd). No more unnecessary sign-in redirects. Visit http://localhost:3000 after running dev server.

