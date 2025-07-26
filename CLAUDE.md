# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.4 application built with TypeScript, React 19, and Tailwind CSS 4. The project uses the modern App Router architecture and is bootstrapped from create-next-app.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/app/
├── layout.tsx      # Root layout with font configuration
├── page.tsx        # Home page component
├── globals.css     # Global styles with Tailwind and CSS variables
└── favicon.ico     # App favicon
```

## Key Technologies & Configuration

- **Next.js**: Uses App Router with TypeScript support
- **Styling**: Tailwind CSS 4 with custom CSS variables for theming
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **TypeScript**: Configured with strict mode and path aliases (@/* -> ./src/*)
- **ESLint**: Uses Next.js core-web-vitals and TypeScript extensions
- **Dark Mode**: Automatic dark mode support via CSS media queries

## Architecture Notes

- The application follows Next.js App Router conventions
- Global styles use CSS custom properties for light/dark theme variables
- Font loading is optimized using next/font/google
- Path aliases are configured for clean imports (@/* maps to src/*)
- TypeScript is configured with strict mode and modern ES features

## Special Considerations

- The project uses Turbopack in development for faster builds
- Tailwind CSS 4 is configured with inline themes using CSS variables
- The layout includes font variable classes for consistent typography