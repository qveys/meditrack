# Contribution Guide

Thank you for your interest in contributing to MediTrack! This document provides guidelines for contributing to the
project.

## Development Process

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Standards

- Follow modern TypeScript and React conventions
- Use functional components and hooks
- Adhere to the project's folder structure

### Naming Conventions

- **React Components**: PascalCase (e.g., `Button.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `dateUtils.ts`)
- **Constants**: UPPER_SNAKE_CASE for global constants

## Code Organization

Place new components in the appropriate location according to these rules:

1. If the component is used in a single feature → place it in that feature
2. If the component is used across multiple features → place it in `src/components`
3. For basic UI components → place them in `src/components/ui`

## Tests

- Write unit tests for all new components
- Place tests next to the files they test
- Run all tests before submitting a PR

## Commits

- Use clear and descriptive commit messages
- Reference issues in the commit messages when applicable

## Documentation

- Update documentation when you add or modify features
- Document APIs for new reusable components

Thank you for contributing to MediTrack!
