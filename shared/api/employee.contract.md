# Employee API Contract

## GET /api/employees/me
- **Description**: Returns currently authenticated user profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "profile": {
    "id": "ObjectId",
    "employeeId": "EMP1001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@dayflow.com",
    "phone": "+1234567890",
    "address": "123 Main St, Tech City",
    "profilePicture": "https://cdn.dayflow.com/profiles/emp1001.png",
    "designation": "Software Engineer",
    "department": "Engineering",
    "joiningDate": "2025-01-15T00:00:00.000Z",
    "status": "ACTIVE",
    "role": "EMPLOYEE"
  }
}
```

## PUT /api/employees/me
- **Description**: Updates basic information editable by the employee.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "phone": "+9876543210",
  "address": "456 Side St, Dev City",
  "profilePicture": "https://cdn.dayflow.com/profiles/emp1001_new.png"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Profile updated successfully.",
  "profile": {
    "id": "ObjectId",
    "phone": "+9876543210",
    "address": "456 Side St, Dev City",
    "profilePicture": "https://cdn.dayflow.com/profiles/emp1001_new.png"
  }
}
```

## GET /api/employees
- **Description**: Returns all employees list.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "employees": [
    {
      "id": "ObjectId",
      "employeeId": "EMP1001",
      "firstName": "John",
      "lastName": "Doe",
      "designation": "Software Engineer"
    }
  ]
}
```

## GET /api/employees/:id
- **Description**: Returns specific employee details.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "employee": {
    "id": "ObjectId",
    "employeeId": "EMP1001",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "address": "123 Main St, Tech City",
    "designation": "Software Engineer",
    "department": "Engineering",
    "joiningDate": "2025-01-15T00:00:00.000Z",
    "status": "ACTIVE"
  }
}
```

## PUT /api/employees/:id
- **Description**: Allows admin to update organizational roles or designations.
- **Headers**: `Authorization: Bearer <token>` (Admin Only)
- **Request Body**:
```json
{
  "designation": "Senior Software Engineer",
  "department": "R&D",
  "status": "ACTIVE"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Employee details updated successfully."
}
```
