# Address Book Application

A full-stack address book application built with .NET 8 Web API, React TypeScript, and SQL Server, featuring secure authentication and modern UI components.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Development](#development)

## Features

- User authentication with JWT
- CRUD operations for address book entries
- Job and department management
- File upload for profile photos
- Excel export functionality
- Search and filter capabilities
- Responsive design with Ant Design components
- Protected routes and authenticated API endpoints

## Tech Stack

### Backend

- .NET 8 Web API
- Entity Framework Core
- SQL Server
- BCrypt for password hashing
- JWT for authentication
- EPPlus for Excel export

### Frontend

- React 18 with TypeScript
- Redux Toolkit for state management
- Ant Design (antd) for UI components
- TailwindCSS for styling
- Axios for API calls
- React Router v6

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [SQL Server](https://www.microsoft.com/sql-server)
- Git
- IDE (Visual Studio Code, Visual Studio, etc.)

## Getting Started

### Backend Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd [project-name]
```

2. Update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AddressBook;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  }
}
```

3. Apply database migrations:

```bash
cd AddressBookService
dotnet ef database update
```

For Migrations

```bash
dotnet ef migrations add MyMigration
```

4. Run the backend:

```bash
dotnet run
```

The API will be available at `https://localhost:5270`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
VITE_API_URL=https://localhost:5270/api
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

### Backend Structure

```
AddressBookService/
├── Controllers/
│   ├── AddressBookController.cs
│   ├── AuthController.cs
│   ├── DepartmentsController.cs
│   └── JobsController.cs
├── Models/
│   ├── AddressBookEntry.cs
│   ├── Department.cs
│   ├── Job.cs
│   └── AdminUser.cs
├── Services/
│   ├── AddressBookService.cs
│   └── AuthService.cs
├── Data/
│   └── AddressBookContext.cs
|   DTOs/ (Data Transfer Object)
|   └── AddressBookEntryDTO.cs
└── Program.cs
```

### Frontend Structure

```
src/
├── components/
│   ├── Department/
│   ├── Job/
│   ├── Auth/
│   ├── AppHeader.tsx
├── store/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── addressBookSlice.ts
│   └── store.ts
├── api/
│   └── index.ts
├── types/
│   └── index.ts
└── App.tsx
```

## API Documentation

### Authentication Endpoints

```
POST /api/auth/login
POST /api/auth/register
```

### Address Book Endpoints

```
GET /api/addressbook
POST /api/addressbook
PUT /api/addressbook/{id}
DELETE /api/addressbook/{id}
GET /api/addressbook/search?searchTerm=
GET /api/addressbook/export
```

### Jobs Endpoints

```
GET /api/jobs
POST /api/jobs
PUT /api/jobs/{id}
DELETE /api/jobs/{id}
```

### Departments Endpoints

```
GET /api/departments
POST /api/departments
PUT /api/departments/{id}
DELETE /api/departments/{id}
```

## Security

- JWT authentication
- Password hashing using BCrypt
- Protected routes in frontend
- Authenticated API endpoints

## Development

### Adding New Features

1. Create new models in both backend and frontend
2. Add new endpoints in the API controllers
3. Create corresponding frontend components
4. Update TypeScript types as needed
5. Add new routes in App.tsx
6. Update API service with new endpoints

### Building for Production

Backend:

```bash
dotnet publish -c Release
```

Frontend:

```bash
npm run build
```
