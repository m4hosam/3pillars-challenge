using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;

namespace AddressBookService.Services;

public class AddressBookService(AddressBookContext context, IWebHostEnvironment environment) : IAddressBookService
{
    private readonly AddressBookContext _context = context;
    private readonly IWebHostEnvironment _environment = environment;

    public async Task<IEnumerable<AddressBookEntry>> GetAllEntriesAsync()
    {
        return await _context.AddressBookEntries
            .Include(e => e.Job)
            .Include(e => e.Department)
            .ToListAsync();
    }

    public async Task<AddressBookEntry> GetEntryByIdAsync(int id)
    {
        return await _context.AddressBookEntries
            .Include(e => e.Job)
            .Include(e => e.Department)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<AddressBookEntry?> CreateEntryAsync(AddressBookEntryDTO entryDto)
    {
        var photoPath = await SavePhotoAsync(entryDto.Photo);

        var job = await _context.Jobs.FindAsync(entryDto.JobId);
        var department = await _context.Departments.FindAsync(entryDto.DepartmentId);
        if (job == null || department == null)
        {
            return null;
        }
        if (entryDto.Password == null)
        {
            return null;
        }

        var entry = new AddressBookEntry
        {
            FullName = entryDto.FullName,
            JobId = entryDto.JobId,
            DepartmentId = entryDto.DepartmentId,
            Job = job,
            Department = department,
            MobileNumber = entryDto.MobileNumber,
            DateOfBirth = entryDto.DateOfBirth,
            Address = entryDto.Address,
            Email = entryDto.Email,
            Password = HashPassword(entryDto.Password),
            PhotoPath = photoPath,
            Age = CalculateAge(entryDto.DateOfBirth)
        };

        _context.AddressBookEntries.Add(entry);
        await _context.SaveChangesAsync();
        return entry;
    }

    public async Task<AddressBookEntry> UpdateEntryAsync(int id, AddressBookEntryDTOPartial entryDto)
    {
        var entry = await _context.AddressBookEntries.FindAsync(id);
        if (entry == null) return default!;

        if (entryDto.Photo != null)
        {
            DeletePhoto(entry.PhotoPath);
            entry.PhotoPath = await SavePhotoAsync(entryDto.Photo);
        }

        entry.FullName = entryDto.FullName;
        entry.JobId = entryDto.JobId;
        entry.DepartmentId = entryDto.DepartmentId;
        entry.MobileNumber = entryDto.MobileNumber;
        entry.DateOfBirth = entryDto.DateOfBirth;
        entry.Address = entryDto.Address;
        entry.Email = entryDto.Email;
        if (!string.IsNullOrEmpty(entryDto.Password))
        {
            entry.Password = HashPassword(entryDto.Password);
        }
        entry.Age = CalculateAge(entryDto.DateOfBirth);

        await _context.SaveChangesAsync();
        return entry;
    }

    public async Task DeleteEntryAsync(int id)
    {
        var entry = await _context.AddressBookEntries.FindAsync(id);
        if (entry != null)
        {
            DeletePhoto(entry.PhotoPath);
            _context.AddressBookEntries.Remove(entry);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<AddressBookEntry>> SearchEntriesAsync(string searchTerm, DateTime? startDate, DateTime? endDate)
    {
        var query = _context.AddressBookEntries
            .Include(e => e.Job)
            .Include(e => e.Department)
            .AsQueryable();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            searchTerm = searchTerm.ToLower();
            query = query.Where(e =>
                e.FullName.ToLower().Contains(searchTerm) ||
                e.Email.ToLower().Contains(searchTerm) ||
                e.Address.ToLower().Contains(searchTerm) ||
                e.MobileNumber.Contains(searchTerm));
        }

        if (startDate.HasValue)
        {
            query = query.Where(e => e.DateOfBirth >= startDate.Value);
        }

        if (endDate.HasValue)
        {
            query = query.Where(e => e.DateOfBirth <= endDate.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<byte[]> ExportToExcelAsync()
    {
        var entries = await GetAllEntriesAsync();

        using var package = new ExcelPackage();
        {
            var worksheet = package.Workbook.Worksheets.Add("Address Book");

            // Add headers
            worksheet.Cells[1, 1].Value = "Full Name";
            worksheet.Cells[1, 2].Value = "Job Title";
            worksheet.Cells[1, 3].Value = "Department";
            worksheet.Cells[1, 4].Value = "Mobile Number";
            worksheet.Cells[1, 5].Value = "Date of Birth";
            worksheet.Cells[1, 6].Value = "Age";
            worksheet.Cells[1, 7].Value = "Email";
            worksheet.Cells[1, 8].Value = "Address";
            worksheet.Cells[1, 9].Value = "Photo Url";

            // Add data
            int row = 2;
            foreach (var entry in entries)
            {
                worksheet.Cells[row, 1].Value = entry.FullName;
                worksheet.Cells[row, 2].Value = entry.Job?.Title;
                worksheet.Cells[row, 3].Value = entry.Department?.Name;
                worksheet.Cells[row, 4].Value = entry.MobileNumber;
                worksheet.Cells[row, 5].Value = entry.DateOfBirth;
                worksheet.Cells[row, 6].Value = entry.Age;
                worksheet.Cells[row, 7].Value = entry.Email;
                worksheet.Cells[row, 8].Value = entry.Address;
                worksheet.Cells[row, 9].Value = entry.PhotoPath;

                row++;
            }

            worksheet.Cells.AutoFitColumns();
            return await package.GetAsByteArrayAsync();
        }
    }

    private async Task<string> SavePhotoAsync(IFormFile photo)
    {
        if (photo == null) return default!;
        var rootPath = _environment.WebRootPath ?? _environment.ContentRootPath;
        var uploadsFolder = Path.Combine(rootPath, "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = Guid.NewGuid().ToString() + "_" + photo.FileName;
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await photo.CopyToAsync(fileStream);
        }
        var relativePath = Path.Combine(uniqueFileName);
        return relativePath;
    }

    private void DeletePhoto(string photoPath)
    {
        if (string.IsNullOrEmpty(photoPath)) return;
        var rootPath = _environment.WebRootPath ?? _environment.ContentRootPath;
        var filePath = Path.Combine(rootPath, "uploads", photoPath);
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }
    }

    private static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    private static int CalculateAge(DateTime dateOfBirth)
    {
        var today = DateTime.Today;
        var age = today.Year - dateOfBirth.Year;
        if (dateOfBirth.Date > today.AddYears(-age)) age--;
        return age;
    }
}
