# UI Specification: Todo Application

## Pages

### Home Page (/)
- If not authenticated: Show login/signup options
- If authenticated: Show user dashboard with task list

### Task List Page (/tasks)
- Shows all tasks for the authenticated user
- Filtering options: All, Pending, Completed
- Sorting options: By date created, by title
- Add new task button/form
- List of tasks with title, status, and action buttons

### Task Detail Page (/tasks/{id})
- Shows full details of a specific task
- Option to edit or delete the task
- Toggle completion status

## Components

### Task Card
- Title with strikethrough when completed
- Description (if available)
- Status indicator (pending/completed)
- Action buttons (edit, delete, toggle complete)

### Task Form
- Title input field (required)
- Description textarea (optional)
- Save/cancel buttons
- Validation error messages

### Navigation
- Logo/title
- User profile/logout (when authenticated)
- Responsive design for mobile

## Responsive Design
- Mobile-first approach
- Grid layout adjusts based on screen size
- Touch-friendly buttons and inputs
- Collapsible navigation on mobile

## Authentication Components
- Login form with email/password
- Signup form with email/password
- Forgot password functionality
- Protected route components