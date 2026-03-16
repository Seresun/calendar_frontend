Calendar Frontend

This package contains the frontend for the calendar application with tasks and holidays.
The interface is built with React and TypeScript, bundled using Vite. The UI follows a Trello-style calendar layout.

Features

Monthly calendar grid view.

Tasks displayed inside calendar days with drag-and-drop support.

Inline editing of task text on double click.

Ability to delete a task using a small close button in the top-right corner of the card.

Public holidays displayed in the calendar, loaded from the backend API.

Task search functionality.

Requirements

Node.js 18+

A running backend from this project (see the backend/ folder).

Installation and Running
cd frontend
npm install
npm run dev

The application will start by default at:

http://localhost:5173
Environment Setup

The frontend communicates with the backend using an Axios client.

By default, it uses the deployed backend URL:

// src/api/client.ts
const baseURL =
  import.meta.env.VITE_API_URL || 'https://calendar-backend-wx4e.onrender.com/';

If you want to work with a local backend server, create a .env file in the frontend directory and add:

VITE_API_URL=http://localhost:3001

After changing environment variables, restart the development server with npm run dev.

Main Scripts

npm run dev — starts the Vite development server.

npm run build — runs type checking and creates a production build.

npm run preview — previews the production build locally.

npm run lint — runs ESLint.

Project Structure

src/components/calendar — calendar components (header, grid, day cell).

src/components/tasks — task UI and inline editor.

src/hooks — logic for working with dates, tasks, and drag-and-drop.

src/api — HTTP client and functions for communicating with the backend.

src/styles — theme and global styles.

Deployment

The frontend can be deployed to any static hosting platform (for example, Vercel).

In production, make sure that VITE_API_URL points to the correct deployed backend.