# Leave API Contract

## POST /api/leaves
- **Description**: Submits a new leave request.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
  "leaveType": "SICK",
  "startDate": "2026-08-25T00:00:00.000Z",
  "endDate": "2026-08-26T00:00:00.000Z",
  "remarks": "Fever and doctor consultation"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "leaveRequest": {
    "id": "ObjectId",
    "leaveType": "SICK",
    "startDate": "2026-08-25T00:00:00.000Z",
    "endDate": "2026-08-26T00:00:00.000Z",
    "remarks": "Fever and doctor consultation",
    "status": "PENDING"
  }
}
```

## GET /api/leaves/me
- **Description**: Retrieves own leave logs.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "leaves": [
    {
      "id": "ObjectId",
      "leaveType": "SICK",
      "startDate": "2026-08-25T00:00:00.000Z",
      "endDate": "2026-08-26T00:00:00.000Z",
      "status": "PENDING"
    }
  ]
}
```

## GET /api/leaves
- **Description**: Returns all leave requests.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Response (200 OK)**:
```json
{
  "success": true,
  "leaves": [
    {
      "id": "ObjectId",
      "employeeName": "John Doe",
      "leaveType": "SICK",
      "startDate": "2026-08-25T00:00:00.000Z",
      "endDate": "2026-08-26T00:00:00.000Z",
      "status": "PENDING"
    }
  ]
}
```

## PUT /api/leaves/:id/approve
- **Description**: Approves a leave request.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Request Body**:
```json
{
  "comments": "Approved. Ensure handoff is done."
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Leave request approved successfully.",
  "leaveRequest": {
    "id": "ObjectId",
    "status": "APPROVED",
    "adminComments": "Approved. Ensure handoff is done."
  }
}
```

## PUT /api/leaves/:id/reject
- **Description**: Rejects a leave request.
- **Headers**: `Authorization: Bearer <token>` (Admin/HR Only)
- **Request Body**:
```json
{
  "comments": "Rejected due to project release deadline."
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Leave request rejected successfully.",
  "leaveRequest": {
    "id": "ObjectId",
    "status": "REJECTED",
    "adminComments": "Rejected due to project release deadline."
  }
}
```
