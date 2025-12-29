# Fundamental Laws (Phase 1-3: Todo App Evolution)

## Phase 1: Todo Console App
1. **Architecture**: Use a clean, modular Python structure. Create a `TodoApp` class to handle logic.
2. **Storage**: STRICTLY In-Memory (Lists/Dictionaries). DO NOT use external databases (SQL/NoSQL) or file storage (JSON/CSV) for this phase.
3. **UI**: Command Line Interface (CLI) only. Use a `while True` loop for the main menu.
4. **Language**: Python 3.13+.
5. **Error Handling**: The app must not crash on invalid input (e.g., entering text when ID is needed).
6. **Documentation**: Code must be well-commented explaining the logic.

## Phase 2: Full-Stack Web Application
1. **Architecture**: Use a monorepo structure with separate frontend and backend.
2. **Backend**: FastAPI with SQLModel ORM, Neon PostgreSQL, Better Auth for JWT.
3. **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS.
4. **API**: RESTful endpoints under `/api/` with JSON responses.
5. **Authentication**: JWT token verification for protected routes.
6. **Database**: Proper indexing for user_id fields for performance.

## Phase 3: Todo AI Chatbot
1. **Architecture**: AI-powered chatbot using OpenAI Agents SDK with MCP (Model Context Protocol) server.
2. **Frontend**: OpenAI ChatKit for conversational interface.
3. **Backend**: Python FastAPI with stateless chat endpoint that persists conversation state to database.
4. **AI Framework**: OpenAI Agents SDK for natural language processing.
5. **MCP Server**: Official MCP SDK exposing task operations as tools (add_task, list_tasks, complete_task, delete_task, update_task).
6. **Database**: Neon Serverless PostgreSQL with SQLModel ORM for conversation and task state persistence.
7. **Authentication**: Better Auth integration for user management.
8. **State Management**: Stateless server architecture with database-persisted conversation state.
9. **Natural Language**: Support for natural language commands to manage tasks (add, list, complete, delete, update).
10. **Scalability**: Designed for horizontal scaling with any server instance able to handle any request.
