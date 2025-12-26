# REST API Endpoints

## Base URL
- Development: http://localhost:8000
- Production: https://api.example.com

## Authentication
All endpoints require JWT token in header:
Authorization: Bearer <token>

## Endpoints

### GET /api/{user_id}/tasks
List all tasks for authenticated user.

Query Parameters:
- status: "all" | "pending" | "completed"
- sort: "created" | "title" | "due_date"

Response: Array of Task objects

### POST /api/{user_id}/tasks
Create a new task.

Request Body:
- title: string (required, 1-200 chars)
- description: string (optional, max 1000 chars)

Response: Created Task object

### GET /api/{user_id}/tasks/{id}
Get task details.

Response: Single Task object

### PUT /api/{user_id}/tasks/{id}
Update a task.

Request Body:
- title: string (required, 1-200 chars)
- description: string (optional, max 1000 chars)

Response: Updated Task object

### DELETE /api/{user_id}/tasks/{id}
Delete a task.

Response: Empty with 204 status code

### PATCH /api/{user_id}/tasks/{id}/complete
Toggle completion status.

Request Body:
- completed: boolean

Response: Updated Task object

## Error Responses
All error responses follow this format:
```json
{
  "detail": "Error message"
}
```

Common status codes:
- 401: Unauthorized (invalid/missing JWT)
- 403: Forbidden (user doesn't own the resource)
- 404: Not Found (resource doesn't exist)
- 422: Validation Error (invalid input data)