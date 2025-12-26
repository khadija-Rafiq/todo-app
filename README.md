# Todo Full-Stack Web Application

This is a multi-user todo application built with Next.js and FastAPI, featuring authentication and persistent storage.

## Tech Stack

- **Frontend**: Next.js 16+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Python FastAPI, SQLModel ORM
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT
- **Spec-Driven Development**: Claude Code + Spec-Kit Plus

## Features

- User authentication (signup/signin)
- Task CRUD operations (Create, Read, Update, Delete)
- Task completion toggling
- User data isolation
- Responsive UI design

## Project Structure

```
todo-fullstack-app/
├── .specify/                 # Spec-Kit configuration
├── specs/                    # Specifications
│   ├── overview.md
│   ├── features/
│   ├── api/
│   ├── database/
│   └── ui/
├── frontend/                 # Next.js application
├── backend/                  # FastAPI application
├── CLAUDE.md                 # Root Claude Code instructions
└── README.md                 # This file
```

## API Endpoints

The application provides a RESTful API with the following endpoints:

- `GET /api/{user_id}/tasks` - List all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks/{id}` - Get task details
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion status

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Neon PostgreSQL account

### Setup

1. Clone the repository
2. Set up environment variables for database and authentication
3. Install dependencies for both frontend and backend
4. Run the applications

### Running the Application

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Security

- All API endpoints require JWT authentication
- Users can only access their own data
- Passwords are securely handled by Better Auth
- Input validation on both frontend and backend
