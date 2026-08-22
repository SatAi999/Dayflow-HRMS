# Attendance API Contract

## POST /api/attendance/check-in
- **Description**: Logs a check-in action for today.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK / 201 Created)**:
```json
{
  "success": true,
  "attendance": {
    "id": "ObjectId",
    "date": "2026-08-22",
    "checkIn": "2026-08-22T09:00:00.000Z",
    "status": "PRESENT"
  }
}
```

## POST /api/attendance/check-out
- **Description**: Updates the daily record with check-out timestamp.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "attendance": {
    "id": "ObjectId",
    "date": "2026-08-22",
    "checkIn": "2026-08-22T09:00:00.000Z",
    "checkOut": "2026-08-22T17:00:00.000Z",
    "status": "PRESENT"
  }
}
```

## GET /api/attendance/me
- **Description**: Retrieves current employee's history.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "records": [
    {
      "date": "2026-08-22",
      "checkIn": "2026-08-22T09:00:00.000Z",
      "checkOut": "2026-08-22T17:00:00.000Z",
      "status": "PRESENT"
    }
  ]
}
```

## GET /api/attendance
- **Description**: Retrieves attendance logs for all employees.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "records": [
    {
      "employeeId": "ObjectId",
      "date": "2026-08-22",
      "checkIn": "2026-08-22T09:00:00.000Z",
      "checkOut": "2026-08-22T17:00:00.000Z",
      "status": "PRESENT"
    }
  ]
}
```

## GET /api/attendance/:employeeId
- **Description**: Retrieves attendance history for a specific employee.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "records": [
    {
      "date": "2026-08-22",
      "checkIn": "2026-08-22T09:00:00.000Z",
      "status": "PRESENT"
    }
  ]
}
```
