# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm ci` - Install dependencies (recommended over npm install)
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run Biome linting and formatting checks

### Storybook
- `npm run storybook` - Start Storybook development server on port 6006
- `npm run build-storybook` - Build Storybook for production

## Architecture Overview

This is a Next.js planning poker client application that connects to a WebSocket-based planning poker server.

### Core Technologies
- **Next.js 14** with App Router (pages in `app/(routes)/`)
- **TypeScript** with strict typing
- **Tailwind CSS** with custom design system and CSS variables
- **Jotai** for global state management (user name, theme color)
- **WebSocket** for real-time communication with planning poker server
- **Supabase** for authentication (SSR-enabled)
- **Biome** for code formatting and linting
- **Storybook** for component development

### Project Structure
- `app/(routes)/` - Next.js App Router pages (login, home, room pages)
- `app/_components/` - React components organized by purpose:
  - `containers/` - Complex components with business logic
  - `uiparts/` - Reusable UI components
  - `providers/` - React context providers
- `app/_lib/` - Utility functions and custom hooks
  - `atoms.ts` - Jotai atoms for global state
  - `useWebSocket.ts` - WebSocket connection management
  - `themes.ts` - Theme configuration
- `app/_types/` - TypeScript type definitions
- `utils/supabase/` - Supabase client configuration
- `stories/` - Storybook stories

### State Management Architecture
- **Jotai atoms** for persistent client-side state (username, theme color)
- **WebSocket hook** (`useWebSocket`) manages real-time server communication
- **Local React state** for UI-specific state

### WebSocket Integration
The `useWebSocket` hook handles all real-time features:
- Room joining/leaving
- Vote submission and revelation
- Timer controls (reset, pause, resume)
- Reaction system
- Automatic reconnection and heartbeat

### Theme System
- Five color themes: pink, blue, green, purple, orange
- CSS custom properties for theme colors
- Dark mode support via Tailwind's class-based dark mode
- Theme state persisted via Jotai storage atom

### Component Architecture
- **Containers**: Handle business logic and state management
- **UI Parts**: Pure presentation components with minimal logic
- **Providers**: Context providers for theme and other app-wide state
- All components follow consistent TypeScript patterns with proper typing

### Authentication
- Supabase integration with SSR support
- Login page with authentication flow
- Middleware handles protected routes

## Code Style Guidelines
- 4-space indentation (enforced by Biome)
- Biome formatting with recommended rules
- Some complexity rules disabled (`noForEach`, `useExhaustiveDependencies`)
- Component organization follows atomic design principles
- TypeScript strict mode with comprehensive type definitions

## Environment Setup
The application requires Supabase environment variables for authentication:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## WebSocket Server
Connects to AWS API Gateway WebSocket endpoint for real-time planning poker functionality.