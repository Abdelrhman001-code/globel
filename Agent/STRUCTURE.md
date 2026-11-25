
A. Feature-Based Frontend Architecture

Organize application features independently.
Each feature should own its relevant UI components.
Keep feature-specific components inside their respective feature directories.
Organize feature-specific hooks and types close to the feature that owns them.
Avoid mixing unrelated features.
Extract genuinely reusable components into shared locations.
B. Component Organization

Each component should have a clear and independent responsibility.
Keep components focused and maintainable.
Separate meaningful subcomponents when appropriate.
Avoid unnecessary component splitting.
Distinguish between feature-specific components and globally shared components.
C. Frontend and Backend Separation

The frontend is strictly responsible for presentation and user interaction.

It must not directly implement:

Database operations.
Business logic.
Backend processing.
Data manipulation that belongs to backend business rules.
Direct database access.
The frontend communicates with backend functionality through the approved backend interfaces.

D. Centralized Backend Ownership

The Supervisor Agent is the sole owner of backend development and implementation.

Its responsibilities include:

Database schema and architecture.
Database migrations.
Supabase Edge Functions.
Backend business logic.
CRUD operations.
Authentication and authorization.
Data validation and security.
Row Level Security (RLS).
Storage operations.
External integrations.
Backend-related shared utilities and types.
Other agents must not independently create or modify backend implementations.

The backend architecture should be organized around Supabase and its Edge Functions without introducing unnecessary architectural layers or duplicate backend locations.

E. Supabase Organization

Account for the project's Supabase infrastructure, including:

Edge Functions.
Database migrations.
Database-related configuration.
Shared backend functionality where appropriate.
Keep Supabase-related files in their appropriate locations and follow the established Supabase conventions.

Do not invent additional infrastructure or duplicate Supabase functionality.

Part 3: Structure Organization Rules
Define practical rules governing how all agents must organize future files.

Include rules covering:

Where new pages and routes should be created.
Where feature-specific components belong.
Where shared UI components belong.
How feature-specific hooks and types should be organized.
How backend files are organized and who owns them.
How Supabase Edge Functions and migrations are organized.
When a component should be extracted into an independent component.
When shared components should be reused.
How to avoid unnecessary folders and excessive nesting.
How to maintain consistency with the target architecture.
4. Important Architectural Rules
The following rules are mandatory:

Current Project Structure represents reality, not future plans.