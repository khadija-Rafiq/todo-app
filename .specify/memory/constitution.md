# Todo Full-Stack Web Application Constitution

## Core Principles

### I. Full-Stack Integration
Modern web applications require seamless integration between frontend and backend. Every feature must be implemented across both layers with consistent user experience and data flow. Frontend (Next.js) and backend (FastAPI) must work in harmony through well-defined API contracts.

### II. Security-First Architecture
Security is paramount in multi-user applications. All API endpoints must implement proper authentication and authorization. User data isolation is non-negotiable - each user must only access their own data. JWT tokens with proper verification must secure all endpoints.

### III. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced. Both frontend and backend tests must be implemented for every feature.

### IV. API-First Design
All functionality must be designed through well-defined RESTful API contracts first. Frontend and backend implementations follow API specifications. Changes to API contracts require explicit approval and proper versioning considerations.

### V. Database-Driven Architecture
Data models and relationships form the foundation of application logic. All database schemas must be defined before implementation with proper indexing and constraints. SQLModel ORM patterns must be followed consistently.

### VI. Responsive UI/UX Design
Frontend interfaces must be responsive and accessible across all device types. User experience should be intuitive with proper loading states, error handling, and feedback mechanisms.

## Technology Stack Requirements

### Frontend
- Next.js 16+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Better Auth for authentication

### Backend
- FastAPI for API framework
- Python 3.10+
- SQLModel for ORM
- Neon Serverless PostgreSQL for database

### Authentication & Security
- Better Auth with JWT tokens
- Shared secret key for token verification
- User isolation through JWT validation
- Proper error handling for unauthorized access

### API Standards
- RESTful endpoints under `/api/` prefix
- JWT tokens in Authorization header
- Proper HTTP status codes
- Consistent error response format

## Development Workflow

### Feature Implementation Process
1. Define feature in specs/ directory
2. Design API contracts in specs/api/
3. Define database schema in specs/database/
4. Implement backend API with tests
5. Implement frontend components with tests
6. Integrate frontend with backend API
7. Test end-to-end functionality

### Code Quality Standards
- All code must follow established patterns in CLAUDE.md
- Database operations through SQLModel only
- API calls through centralized client
- Proper error handling and validation
- Type safety enforced throughout

### Testing Requirements
- Unit tests for all backend endpoints
- Integration tests for API/database interactions
- Frontend component tests
- End-to-end tests for critical user flows

## Governance

All implementations must comply with this constitution. Changes to core architecture require explicit approval and proper documentation. Every feature must be traceable to specifications and meet all security requirements.

API endpoints must follow the specified patterns and security requirements. Database schemas must match specifications exactly. Authentication must be implemented on all endpoints that access user data.

**Version**: 1.0.0 | **Ratified**: 2025-12-25 | **Last Amended**: 2025-12-25