# Auth API Contract

## POST /api/auth/signup
- **Description**: Registers a new user session.
- **Request Body**:
```json
{
  "employeeId": "EMP1001",
  "email": "user@dayflow.com",
  "password": "SecurePassword123!",
  "role": "EMPLOYEE"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email.",
  "user": {
    "id": "ObjectId",
    "employeeId": "EMP1001",
    "email": "user@dayflow.com",
    "role": "EMPLOYEE",
    "isVerified": false
  }
}
```

## POST /api/auth/login
- **Description**: Logs in an existing user and returns a stateless JWT.
- **Request Body**:
```json
{
  "email": "user@dayflow.com",
  "password": "SecurePassword123!"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "token": "JWT_TOKEN_STRING",
  "user": {
    "id": "ObjectId",
    "employeeId": "EMP1001",
    "email": "user@dayflow.com",
    "role": "EMPLOYEE"
  }
}
```

## POST /api/auth/verify-email
- **Description**: Verifies user email.
- **Request Body**:
```json
{
  "email": "user@dayflow.com",
  "token": "token-string"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Email verified successfully."
}
```

## POST /api/auth/logout
- **Description**: Log out a user session.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```
