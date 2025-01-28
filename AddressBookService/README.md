# Address Book Web Service

A .NET Core Web API service for managing address book entries, jobs, and departments. This service provides comprehensive CRUD operations and additional features like search functionality and Excel export.

## Features

- Full CRUD operations for address book entries, jobs, and departments
- Photo upload and storage for contact entries
- Secure password handling with hashing
- Advanced search functionality with multiple criteria
- Export address book to Excel
- Automatic age calculation based on date of birth

## Prerequisites

- .NET 6.0 or later
- SQL Server (with SQL Server Management Studio)
- Visual Studio 2022 or VS Code

## Required Packages

```bash
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools
Microsoft.EntityFrameworkCore.Design
EPPlus
BCrypt.Net-Next
```

## Installation

1. Clone the repository

```bash
git clone [repository-url]
cd AddressBookService
```

2. Install the Entity Framework Core tools globally:

```bash
dotnet tool install --global dotnet-ef
```

3. Update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YourServerName\\SQLEXPRESS;Database=AddressBook;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
  }
}
```

4. Create and apply the database migrations:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

5. Run the application:

```bash
dotnet run
```

## API Endpoints

### Address Book Entries

- GET `/api/addressbook` - Get all entries
- GET `/api/addressbook/{id}` - Get specific entry
- POST `/api/addressbook` - Create new entry
- PUT `/api/addressbook/{id}` - Update entry
- DELETE `/api/addressbook/{id}` - Delete entry
- GET `/api/addressbook/search` - Search entries
- GET `/api/addressbook/export` - Export to Excel

### Jobs

- GET `/api/jobs` - Get all jobs
- GET `/api/jobs/{id}` - Get specific job
- POST `/api/jobs` - Create new job
- PUT `/api/jobs/{id}` - Update job
- DELETE `/api/jobs/{id}` - Delete job

### Departments

- GET `/api/departments` - Get all departments
- GET `/api/departments/{id}` - Get specific department
- POST `/api/departments` - Create new department
- PUT `/api/departments/{id}` - Update department
- DELETE `/api/departments/{id}` - Delete department

## API Usage Examples

### Creating a New Address Book Entry

```json
POST /api/addressbook
Content-Type: multipart/form-data

{
  "fullName": "John Doe",
  "jobId": 1,
  "departmentId": 1,
  "mobileNumber": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "address": "123 Main St",
  "email": "john@example.com",
  "password": "securepassword",
  "photo": [binary file data]
}
```

### Creating a New Job

```json
POST /api/jobs
Content-Type: application/json

{
  "title": "Software Developer"
}
```

### Creating a New Department

```json
POST /api/departments
Content-Type: application/json

{
  "name": "Engineering"
}
```

### Searching Entries

```
GET /api/addressbook/search?searchTerm=john&startDate=1990-01-01&endDate=2000-01-01
```

## Project Structure

```
AddressBookService/
├── Controllers/
│   ├── AddressBookController.cs
│   ├── JobsController.cs
│   └── DepartmentsController.cs
├── Models/
│   ├── AddressBookEntry.cs
│   ├── Job.cs
│   └── Department.cs
├── DTOs/
│   ├── AddressBookEntryDTO.cs
│   ├── JobDTO.cs
│   └── DepartmentDTO.cs
├── Services/
│   ├── IAddressBookService.cs
│   ├── AddressBookService.cs
│   ├── IJobService.cs
│   ├── JobService.cs
│   ├── IDepartmentService.cs
│   └── DepartmentService.cs
├── Data/
│   └── AddressBookContext.cs
├── Program.cs
└── appsettings.json
```

## Security Considerations

- Passwords are hashed using BCrypt before storage
- Uses Windows Authentication for database connection by default
- Implements proper input validation and error handling
- Supports secure file upload for photos
