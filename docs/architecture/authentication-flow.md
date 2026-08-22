# Authentication Flow - Dayflow HRMS

This document outlines the authentication and authorization flow implemented in Dayflow HRMS, covering both frontend client interactions and backend validation steps.

---

## 1. Sign Up Flow

```mermaid
sequenceDiagram
    participant User as Employee / HR Client
    participant FE as React Frontend
    participant BE as Express Backend
    participant DB as MongoDB

    User->>FE: Fill EmployeeID, Email, Password, Role
    FE->>FE: Perform Client-Side Validations
    FE->>BE: POST /api/auth/signup
    BE->>BE: Validate input data
    BE->>BE: Generate secure password hash (bcryptjs)
    BE->>DB: Check if email/employeeId exists
    DB-->>BE: (Email/EmployeeID is unique)
    BE->>DB: Save User document (isVerified = false)
    DB-->>BE: User Saved
    BE->>BE: Generate email verification token (random string / UUID)
    BE-->>FE: Return 201 Created ("Please verify your email")
    FE-->>User: Show verification instruction page
```

---

## 2. Sign In Flow

```mermaid
sequenceDiagram
    participant User as Employee / HR Client
    participant FE as React Frontend
    participant BE as Express Backend
    participant DB as MongoDB

    User->>FE: Enter Email and Password
    FE->>BE: POST /api/auth/login
    BE->>DB: Find User by Email
    DB-->>BE: User document
    BE->>BE: Compare hashes (bcrypt.compare)
    alt Passwords Match & Email is Verified
        BE->>BE: Generate JWT token containing payload:<br/>{ id, employeeId, email, role }
        BE-->>FE: Return 200 OK with token and user object
        FE->>FE: Store JWT in localStorage / Cookie
        FE->>FE: Update AuthContext state
        FE->>FE: Redirect to /employee/dashboard or /admin/dashboard
    else Passwords Mismatch or Unverified Email
        BE-->>FE: Return 401 Unauthorized / 403 Forbidden
        FE-->>User: Display error message
    end
```

---

## 3. Route Access Authorization Flow

Whenever an authorized client requests a resource:

1. **Authorization Header**: The client sends the JWT token in the request header:
   ```http
   Authorization: Bearer <token>
   ```
2. **Backend Authentication Middleware (`requireAuth`)**:
   - Extracts the token from the header.
   - Decodes and verifies the signature using the server's `JWT_SECRET`.
   - Attaches decoded data (`req.user = { id, employeeId, email, role }`) to the request object.
   - If invalid or expired, returns `401 Unauthorized`.
3. **Backend Role Authorization Middleware (`requireRole`)**:
   - Inspects `req.user.role`.
   - Checks if the role is allowed to access the route (e.g. requires `ADMIN` or `HR`).
   - If not authorized, returns `403 Forbidden`.
4. **Backend Ownership Verification Middleware (`requireOwnership`)**:
   - Used for resource-level actions (e.g., retrieving profile, deleting document).
   - Validates that the requested employee record resource ID matches the `req.user.id` or that the requester is `ADMIN`/`HR`.
   - If mismatch, returns `403 Forbidden`.
5. **Frontend Guards**:
   - `ProtectedRoute.jsx` checks `AuthContext` to ensure the user is logged in before rendering dashboard pages.
   - `RoleRoute.jsx` checks user role against permitted roles for the target route, redirecting unauthorized users back to their respective dashboards.
