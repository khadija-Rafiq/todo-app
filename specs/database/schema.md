# Database Schema

## Tables

### users (managed by Better Auth)
- id: string (primary key)
- email: string (unique)
- name: string
- created_at: timestamp

### tasks
- id: integer (primary key, auto-increment)
- user_id: string (foreign key -> users.id)
- title: string (not null, max 200 chars)
- description: text (nullable, max 1000 chars)
- completed: boolean (default false)
- created_at: timestamp (default now)
- updated_at: timestamp (default now, auto-update)

## Indexes
- tasks.user_id (for filtering by user)
- tasks.completed (for status filtering)
- tasks.created_at (for sorting by date)

## Constraints
- tasks.user_id must reference valid users.id
- tasks.title length between 1-200 characters
- tasks.description length max 1000 characters
- All tasks must have an associated user