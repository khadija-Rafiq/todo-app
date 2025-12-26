# Feature: Task CRUD Operations

## User Stories
- As a user, I can create a new task
- As a user, I can view all my tasks
- As a user, I can update a task
- As a user, I can delete a task
- As a user, I can mark a task complete

## Acceptance Criteria

### Create Task
- Title is required (1-200 characters)
- Description is optional (max 1000 characters)
- Task is associated with logged-in user
- Task has default status of pending
- Task has created_at timestamp

### View Tasks
- Only show tasks for current user
- Display title, status, created date
- Support filtering by status (all, pending, completed)
- Support sorting by creation date or title

### Update Task
- Allow updating title and description
- Preserve user association
- Update updated_at timestamp
- Validate data format and length

### Delete Task
- Only allow deleting user's own tasks
- Return appropriate status code
- Handle case where task doesn't exist

### Complete Task
- Toggle completion status
- Update updated_at timestamp
- Only allow modifying user's own tasks