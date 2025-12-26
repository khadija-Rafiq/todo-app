# Backend Guidelines

## Stack
- FastAPI
- SQLModel (ORM)
- Neon PostgreSQL
- Better Auth JWT verification

## Project Structure
- `main.py` - FastAPI app entry point
- `models.py` - SQLModel database models
- `routes/` - API route handlers
- `db.py` - Database connection
- `auth.py` - JWT authentication middleware

## API Conventions
- All routes under `/api/`
- Return JSON responses
- Use Pydantic models for request/response
- Handle errors with HTTPException

## Database
- Use SQLModel for all database operations
- Connection string from environment variable: DATABASE_URL
- Proper indexing for user_id fields for performance

## Authentication
- JWT token verification middleware
- Extract user ID from token
- Verify user ID matches URL parameter
- Return 401 for unauthorized requests

## Running
uvicorn main:app --reload --port 8000