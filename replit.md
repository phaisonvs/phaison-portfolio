# Portfolio Application - Full Stack Development

## Overview

This is a full-stack portfolio application built with React (TypeScript), Express.js, and PostgreSQL. The application features a modern, dark-themed design with Pinterest-style galleries, project management capabilities, and authentication. It's designed to showcase creative work with an emphasis on visual presentation and user experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Theme**: Dark theme with neon blue/green accents
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy and session management
- **Session Storage**: Connect-pg-simple for PostgreSQL session store
- **API**: RESTful endpoints for projects, users, and authentication

## Key Components

### Database Schema
- **Users**: Authentication and profile management
- **Projects**: Portfolio items with metadata, gallery images, and categorization
- **Tags**: Project categorization system
- **Project Tags**: Many-to-many relationship between projects and tags
- **Sessions**: User session management

### Authentication System
- Local authentication strategy using username/password
- Session-based authentication with secure cookies
- Demo user with credentials: `usuario_demo` / `senha123`
- Password hashing using Node.js crypto module
- Protected routes for dashboard access

### Project Management
- Full CRUD operations for projects
- Image gallery support with Pinterest-style layout
- Project categorization and tagging
- Section-based display organization
- Draft/published status management

### User Interface Components
- Responsive design with mobile-first approach
- Pinterest-style masonry grids for galleries
- Animated transitions and scroll-based animations
- Carousel components with dot navigation
- Modern card-based layouts with hover effects

## Data Flow

1. **Authentication Flow**
   - User login → Session creation → Dashboard access
   - Automatic redirect to dashboard after successful login
   - Session persistence across browser restarts

2. **Project Display Flow**
   - Home page → Project cards → Individual project details
   - Gallery visualization with lightbox functionality
   - Tag-based filtering and categorization

3. **Content Management Flow**
   - Dashboard → Project creation/editing → Publication
   - Image upload and gallery management
   - Section assignment for homepage display

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React and React Icons
- **Forms**: React Hook Form with Zod validation
- **Animations**: Class Variance Authority for component variants
- **Image Handling**: Native browser APIs with custom gallery components

### Backend Dependencies
- **Database**: Neon Database (PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Authentication**: Passport.js with local strategy
- **Sessions**: Express-session with PostgreSQL store
- **File Processing**: Node.js built-in modules

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- Express server with TypeScript execution via tsx
- Replit integration with runtime error overlay
- Database migrations via Drizzle Kit

### Production Build
- Frontend: Vite build with static asset optimization
- Backend: ESBuild compilation to ESM format
- Database: Migration-based schema management
- Environment variables for database connection and session secrets

### File Structure
- `client/`: React frontend application
  - `src/features/`: Feature-based organization
    - `home/`: Homepage and about page components
    - `projetos/`: Projects listing, detail, and related components
    - `contato/`: Contact-related functionality  
    - `auth/`: Authentication pages and components
    - `dashboard/`: Administrative dashboard (hidden from public)
    - `shared/`: Shared components (header, footer, cards, etc.)
  - `src/components/ui/`: shadcn/ui components
  - `src/lib/`: Utility functions and configurations
  - `src/hooks/`: Custom React hooks
- `server/`: Express backend with API routes
- `shared/`: Common TypeScript types and schemas
- `components.json`: shadcn/ui configuration
- `drizzle.config.ts`: Database configuration

## Changelog

```
Changelog:
- July 28, 2025. Major restructuring update:
  * Reorganized file structure to feature-based architecture
  * Updated header navigation: "Home" → "Início", centered menu
  * Updated footer links: removed Templates/Privacidade, added Início, reordered
  * Moved About page content to homepage as new section
  * Implemented smooth scroll navigation for single-page architecture
  * Renamed tools section to "Minhas Ferramentas de Trabalho"
  * Updated tools for UX/UI Designer profile (Figma, GitHub, HTML, CSS, JavaScript, Photoshop, Illustrator, After Effects)
  * Completely hidden administrative access from public view
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```