# Canteen Management System

A comprehensive canteen management system built with React and TypeScript. This application provides a modern interface for managing menu items, tracking orders, and monitoring inventory with real-time analytics.

## Project Overview

The Canteen Management System is a full-featured web application designed to streamline canteen operations. It enables administrators to manage menu items, track order status, view transaction history, and monitor inventory health through an intuitive dashboard.

## Features

- **Menu Management**: Full CRUD operations for menu items
  - Add, edit, and delete menu items
  - Categorize items (Appetizer, Main Course, Dessert, Beverage, Snack)
  - Set availability status for each item
  - Upload and display item images

- **Order Tracking**: Real-time order status management
  - Place quick orders from menu items
  - Track orders through different stages (New, Preparing, Ready, Completed, Cancelled)
  - Update order status dynamically

- **Transaction History**: Complete order history tracking
  - View all past transactions
  - Filter and search through order records
  - Monitor order completion rates

- **Dashboard Analytics**: Comprehensive overview of operations
  - Real-time inventory statistics
  - Category-wise stock status
  - Order pipeline summary
  - Availability rate monitoring

- **User Interface**: Modern and responsive design
  # Canteen Management System

  ## Overview

  A simple, maintainable web application for managing a canteen menu and basic transactions. Built with React and TypeScript, the app provides an admin-style interface to add, edit, and remove menu items, record quick orders, and review transaction history.

  ## Features

  - Menu management with add / edit / delete capabilities
  - Quick order placement and transaction logging
  - Live order pipeline and full transaction history views
  - Search and category filtering for menu items
  - Persistent data using browser LocalStorage

  ## Tech Stack

  - React (v19)
  - TypeScript
  - Vite (build tool)
  - Tailwind CSS (utility-first styling)

  ## Project Structure

  Top-level layout:

  ```
  /components        # UI components and reusable parts
  /components/ui     # Small UI primitives (Button, Input, Modal, Toast)
  /services          # Data layer (menu items and transactions)
  App.tsx            # Root application component
  index.tsx          # Application entry
  types.ts           # Shared TypeScript types
  vite.config.ts     # Vite configuration
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
  # then open http://localhost:3000 or the URL shown by Vite
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
