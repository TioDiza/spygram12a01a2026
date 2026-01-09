# AI Studio Application Rules

This document outlines the technical stack and guidelines for developing this application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Overview

*   **Frontend Framework**: React (v19.2.0) for building interactive and dynamic user interfaces.
*   **Language**: TypeScript (~v5.8.2) for strong typing, improved code quality, and better developer experience.
*   **Styling**: Tailwind CSS for a utility-first approach to styling, enabling rapid and consistent UI development with responsive design.
*   **Build Tool**: Vite (v6.2.0) for a fast development server and optimized production builds.
*   **Routing**: React Router for declarative client-side navigation within the Single Page Application.
*   **UI Components**: shadcn/ui, built on Radix UI, provides a collection of accessible and customizable UI components.
*   **Icons**: lucide-react for a comprehensive and consistent set of SVG icons.
*   **API Communication**: Native Fetch API for making asynchronous HTTP requests to backend services.
*   **Package Manager**: npm for managing project dependencies.

## Library Usage Rules

*   **UI Components**:
    *   **Always** prioritize using components from `shadcn/ui`. These components are pre-built, accessible, and styled with Tailwind CSS.
    *   If a required component is not available in `shadcn/ui`, create a new custom component in `src/components/` using Tailwind CSS for styling.
    *   **Do not** modify `shadcn/ui` component files directly. If customization is needed, wrap the `shadcn/ui` component in a new custom component.
*   **Styling**:
    *   **Exclusively** use Tailwind CSS classes for all styling. Avoid inline styles or separate CSS files (beyond `index.css` for global resets/imports).
    *   Ensure all designs are responsive by utilizing Tailwind's responsive utility classes.
*   **Icons**:
    *   Use icons from the `lucide-react` library.
    *   If a specific icon is not available in `lucide-react`, a custom SVG can be used as a last resort, placed in `src/components/icons/`.
*   **Routing**:
    *   Implement client-side routing using `react-router-dom`.
    *   All primary application routes **must** be defined and managed within `src/App.tsx`.
*   **State Management**:
    *   For local component state, use React's built-in `useState` and `useReducer` hooks.
    *   For global or more complex state management, consider using React Context API. Avoid external state management libraries unless explicitly requested.
*   **API Calls**:
    *   Use the native `fetch` API for all asynchronous data fetching and interactions with external services.
*   **File Structure**:
    *   New components should be created in `src/components/`.
    *   Application pages should reside in `src/pages/`.
    *   Utility functions for API calls should be in `src/services/`.
    *   Type definitions should be in `src/types.ts`.
    *   Constants should be in `src/constants.ts`.
    *   Directory names **must** be all lower-case.
*   **Component Granularity**:
    *   Always create a new file for every new component or hook, no matter how small.
    *   Aim for components that are generally 100 lines of code or less to promote reusability and maintainability.