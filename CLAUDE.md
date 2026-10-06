PROJECT CONTEXT — Support Chat App

I am building a full-stack customer support chat application for my company.
I am a frontend developer (React, TypeScript, Tailwind) learning backend.
Always write clean, production-quality code with comments explaining key parts,
and tell me exact file paths and terminal commands. I use macOS.

TECH STACK
- Frontend: React (Vite) + TypeScript + Tailwind CSS, React Router, Axios, Socket.io-client
- Backend: Node.js + Express (JavaScript, ES modules), MongoDB with Mongoose
- Real-time: Socket.io (live chat + live notifications)
- Auth: JWT (access token) + bcrypt for password hashing
- Email: Nodemailer (Mailtrap in development)
- API testing: Postman
- Single Git repo with /server (backend) and /client (frontend) folders

ROLES
- Manager, Support, Developer, Client
- Public signup creates ONLY Client accounts.
- Manager invites/creates Support, Developer, and other Manager accounts.
- The first Manager account is created via a seed script.

FEATURES
1. Public landing page (no login) showing company services and what the company deals in.
   Services content is managed by Managers from an admin panel.
2. Guest support form (no login): name, email, message. Saved as a support ticket in the DB.
   Team views tickets in the admin panel and replies; the reply is sent to the guest by email.
3. Auth: signup (Client only), login, logout, forgot password (email reset link), reset password.
4. Profile page: update name, avatar, password.
5. Theme settings per user: preset themes, custom primary/secondary colors, font choice.
   Saved in the user's DB record and applied after login.
6. Live chat: one-to-one chat between logged-in users, with these rules:
   - Client can chat ONLY with staff (Manager, Support, Developer).
   - Client can NOT chat with another Client.
   - Staff can chat with everyone (other staff and all clients).
   - In user search, Clients must NOT see other Clients at all; staff see everyone.
   - Enforce these rules on the backend (REST API and Socket.io events),
     not only in the frontend UI.
   - Each chat shows the other person's name AND role.
   - Chat list has search by name and filter by role.
   - Online/offline status, unread message count, message timestamps.
7. Live notifications: new message, new support ticket (for staff), account invite events.
   Stored in DB, delivered live via Socket.io, with read/unread state.

RULES
- Validate all inputs on the backend.
- Never expose passwords or secrets; use .env for config.
- Protect routes with auth middleware and role-based middleware.
- Use consistent API response format: { success, message, data }.
- When I share an error, explain the cause first, then the fix.

DEPLOYMENT & CONSTRAINTS
- Use only free tools and services. Never suggest paid services.
- Development: run everything locally; database on MongoDB Atlas free tier (M0).
- Demo deployment: frontend on Vercel, backend (Express + Socket.io) on Render free tier.
- The backend must NOT depend on Vercel serverless (Socket.io needs a persistent server).
- Configure CORS and Socket.io origins via .env so they work both locally and in production.
