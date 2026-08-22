# Documents API Contract

## GET /api/documents/me
- **Description**: Returns currently uploaded personal files.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "documents": [
    {
      "id": "ObjectId",
      "fileName": "Aadhar_Card.pdf",
      "fileUrl": "https://storage.dayflow.com/docs/EMP1001_Aadhar.pdf",
      "fileType": "pdf",
      "createdAt": "2026-08-22T04:10:00.000Z"
    }
  ]
}
```

## POST /api/documents
- **Description**: Uploads a new document file.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body (Multipart Form-Data)**:
  - `file`: (Binary data)
  - `fileName`: "Passport_Size_Photo.jpg"
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Document uploaded successfully.",
  "document": {
    "id": "ObjectId",
    "fileName": "Passport_Size_Photo.jpg",
    "fileUrl": "https://storage.dayflow.com/docs/EMP1001_Photo.jpg",
    "fileType": "jpg"
  }
}
```

## DELETE /api/documents/:id
- **Description**: Deletes a specific document.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Document deleted successfully."
}
```
