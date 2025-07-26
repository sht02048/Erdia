# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.4 application built with TypeScript, React 19, and Tailwind CSS 4. The project follows **FSD (Feature-Sliced Design)** architecture pattern with Next.js App Router.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run type-check` - Run TypeScript type checking
- `npm run commit` - Interactive commit with custom gitmoji prompts

## FSD Architecture Structure

This project follows **Feature-Sliced Design (FSD)** with 6 layers:

```
erdia/
├── app/                    # Next.js App Router pages and layouts
├── src/                    # Main source code following FSD architecture
│   ├── shared/            # Layer 1: Common reusable code
│   ├── entities/          # Layer 2: Business domain entities
│   ├── features/          # Layer 3: User interactions & business logic
│   ├── widgets/           # Layer 4: Independent UI blocks
│   └── page/              # Layer 5: Page-level components
├── public/                # Static assets
└── [config files]         # Configuration files
```

### FSD Layer Details

**1. Shared Layer (`src/shared/`)**
- Common code reused across all layers
- Components: Reusable UI components, utils, hooks, types, API clients

**2. Entities Layer (`src/entities/`)**
- Business domain core entities
- Contains entity-specific API, types, UI components, utilities

**3. Features Layer (`src/features/`)**
- User interactions and business logic
- Contains feature API logic, hooks, types, UI components

**4. Widgets Layer (`src/widgets/`)**
- Independent UI blocks combining features/entities
- Complete widgets with providers, layouts

**5. Pages Layer (`src/page/`)**
- Page-level components that combine widgets

**6. App Layer (`app/`)**
- Handled by Next.js App Router structure

### FSD Import Rules (Critical)

**Import dependencies MUST follow this hierarchy:**
- **Shared** can be imported by all layers
- **Entities** can import from Shared only
- **Features** can import from Entities and Shared
- **Widgets** can import from Features, Entities, and Shared
- **Pages** can import from all lower layers
- **App** can import from all layers

### File Organization Pattern

Each FSD slice follows this structure:
```
[layer]/[slice]/
├── api/                   # API-related code
├── types/                 # TypeScript definitions
├── ui/                    # React components
├── hooks/                 # React hooks (features layer)
├── util/                  # Utility functions
└── index.ts              # Public API exports
```

## Key Technologies & Configuration

- **Architecture**: FSD (Feature-Sliced Design) with Next.js App Router
- **Next.js**: 15.4.4 with App Router and TypeScript support
- **Styling**: Tailwind CSS 4 with custom CSS variables for theming
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **TypeScript**: Configured with strict mode and path aliases (@/* -> ./src/*)
- **ESLint**: Uses Next.js core-web-vitals and TypeScript extensions
- **Pre-commit**: Lefthook with lint and type-check hooks
- **Commits**: Custom commitizen with 10 Korean gitmoji types
- **Dark Mode**: Automatic dark mode support via CSS media queries

## Development Workflow

- Use `npm run commit` for interactive commits with custom gitmoji
- Pre-commit hooks automatically run linting and type checking
- Follow FSD import rules when creating new files
- Place shared utilities in `src/shared/`
- Create entities for business domain objects
- Build features for user interactions
- Combine features into widgets for complete UI blocks

## Special Considerations

- The project uses Turbopack in development for faster builds
- Tailwind CSS 4 is configured with inline themes using CSS variables
- FSD architecture requires strict adherence to import rules
- Each layer should have clear boundaries and responsibilities