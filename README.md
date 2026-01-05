# Canteen Management System

## Overview

A simple, maintainable web application for managing a canteen menu and basic transactions. Built with React and JavaScript, the app provides an admin-style interface to add, edit, and remove menu items, record quick orders, and review transaction history.

## Features

- Menu management with add / edit / delete capabilities
- Quick order placement and transaction logging
- Live order pipeline and full transaction history views
- Search and category filtering for menu items
- Persistent data using browser LocalStorage

## Tech Stack

- React (v19)
- JavaScript (ESNext)
- Vite (build tool)
- Tailwind CSS (utility-first styling)

## Project Structure

Top-level layout:

```
/components        # UI components and reusable parts
/components/ui     # Small UI primitives (Button, Input, Modal, Toast)
/services          # Data layer (menu items and transactions)
App.jsx            # Root application component
index.jsx          # Application entry
types.js           # Shared runtime constants
vite.config.js     # Vite configuration
package.json       # Project scripts and dependencies
```

## Installation & Usage

Prerequisites:

- Node.js (v16+)
- npm

Install and run locally:

```powershell
cd "c:\path\to\project"
npm install
npm run dev
# then open the URL shown by Vite (e.g. http://localhost:3001/)
```

To build for production:

```powershell
npm run build
npm run preview
```

If you encounter a port conflict when starting the dev server, Vite will suggest an alternate port.

## Notes

- Data is persisted in the browser's LocalStorage for simplicity.
- The project is structured for clarity and easy extension; add backend syncing or authentication as needed.

---

If you need a CI setup, deployment script, or Docker configuration, I can add those next.
