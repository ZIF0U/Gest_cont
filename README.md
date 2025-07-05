# Gest_contrat - Contract Management System

A modern contract management application built with Next.js, TypeScript, and Tailwind CSS.

## Project Structure

```
Gest_contrat/
├── app/                          # Next.js App Router
│   ├── (view)/                   # View routes (contracts, stats, search, expired)
│   ├── dashboard/                # Dashboard routes
│   │   └── (add)/               # Add contract functionality
│   ├── login/                    # Authentication
│   ├── search/                   # Search functionality
│   ├── user-dashboard/           # User dashboard (empty)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (shadcn/ui)
│   ├── AuthGuard.tsx            # Authentication guard
│   ├── contract-form.tsx        # Contract form component
│   ├── contract-manager.tsx     # Contract management
│   ├── contracts-list.tsx       # Contracts list display
│   ├── expired-contracts-list.tsx # Expired contracts
│   ├── HeaderBar.tsx            # Header component
│   ├── renew-contract-dialog.tsx # Contract renewal dialog
│   ├── search-contracts.tsx     # Search functionality
│   ├── stats-cards.tsx          # Statistics cards
│   ├── stats-overview.tsx       # Statistics overview
│   ├── theme-provider.tsx       # Theme provider
│   ├── view-header.tsx          # View header
│   ├── view-layout.tsx          # View layout
│   └── view-sidebar.tsx         # View sidebar
├── contexts/                    # React contexts
│   └── user-context.tsx         # User context
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx          # Mobile detection hook
│   └── use-toast.ts            # Toast notification hook
├── lib/                        # Utility libraries
│   ├── database.ts             # Database utilities
│   └── utils.ts                # General utilities
├── public/                     # Static assets
├── scripts/                    # Database scripts
│   ├── init-database.sql       # Database initialization
│   └── seed-data.sql           # Sample data
└── electron.js                 # Electron configuration
```

## Key Features

- **Contract Management**: Add, view, and manage contracts
- **Search Functionality**: Search through contracts
- **Statistics Dashboard**: View contract statistics
- **Expired Contracts**: Track and manage expired contracts
- **Responsive Design**: Mobile-friendly interface
- **Dark Mode Support**: Theme switching capability
- **Authentication**: User authentication system

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components
- **SQLite**: Database (via scripts)
- **Electron**: Desktop application support

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize the database:
   ```bash
   # Run the database initialization script
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Organization

### Components Structure
- **UI Components** (`components/ui/`): Reusable shadcn/ui components
- **Feature Components** (`components/`): Application-specific components
- **Layout Components**: Header, sidebar, and layout components

### Hooks
- **use-mobile**: Responsive design hook for mobile detection
- **use-toast**: Toast notification system

### Contexts
- **user-context**: User authentication and state management

### Database
- SQL scripts for initialization and sample data
- Database utilities in `lib/database.ts`

## Development Notes

- The project uses Next.js App Router for routing
- All UI components are built with shadcn/ui for consistency
- Mobile-first responsive design
- TypeScript for type safety
- Tailwind CSS for styling

## Recent Cleanup

- Removed duplicate CSS files (kept `app/globals.css`)
- Removed duplicate hook files (kept `hooks/` directory)
- Removed duplicate package lock files (kept `package-lock.json`)
- Organized imports to use correct paths
