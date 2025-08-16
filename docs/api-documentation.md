# API Documentation

This document describes the REST API endpoints for the Collaborative Code Editor backend.

## Base URL
```
http://localhost:3000/
```

---

## Authentication

### POST /api/auth/register
Register a new user.
- **Body:** `{ username, email, password }`
- **Response:** `201 Created` with user info or error

### POST /api/auth/login
Login and receive a JWT token.
- **Body:** `{ email, password }`
- **Response:** `200 OK` with `{ token }` or error

---

## Projects

### GET /api/projects
Get all projects for the authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK` with array of projects

### POST /api/projects
Create a new project.
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ name, description }`
- **Response:** `201 Created` with project info

### GET /api/projects/:id
Get a specific project by ID.
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK` with project info

### PUT /api/projects/:id
Update a project.
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ name?, description? }`
- **Response:** `200 OK` with updated project

### DELETE /api/projects/:id
Delete a project.
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `204 No Content`

---

## Files

### GET /api/files?projectId=<id>
List files in a project.
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK` with array of files

### POST /api/files
Create a new file in a project.
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ projectId, filename, content }`
- **Response:** `201 Created` with file info

### GET /api/files/:id
Get file details.
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK` with file info

### PUT /api/files/:id
Update file content.
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ content }`
- **Response:** `200 OK` with updated file

### DELETE /api/files/:id
Delete a file.
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `204 No Content`

---

## Collaboration (WebSocket)

See `websocket-events.md` for real-time collaboration events and payloads.

---

## Error Handling
All error responses follow the format:
```
{
  "error": "Error message"
}
```

---

## Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Resource deleted
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Contact
For questions or support, contact KQNAUJIA@GMAIL.COM.
