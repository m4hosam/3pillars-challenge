using Microsoft.EntityFrameworkCore;
public class DepartmentService : IDepartmentService
{
    private readonly AddressBookContext _context;

    public DepartmentService(AddressBookContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Department>> GetAllDepartmentsAsync()
    {
        return await _context.Departments.ToListAsync();
    }

    public async Task<Department> GetDepartmentByIdAsync(int id)
    {
        return await _context.Departments.FindAsync(id);
    }

    public async Task<Department> CreateDepartmentAsync(DepartmentDTO departmentDto)
    {
        var department = new Department { Name = departmentDto.Name };
        _context.Departments.Add(department);
        await _context.SaveChangesAsync();
        return department;
    }

    public async Task<Department> UpdateDepartmentAsync(int id, DepartmentDTO departmentDto)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department == null) return null;

        department.Name = departmentDto.Name;
        await _context.SaveChangesAsync();
        return department;
    }

    public async Task DeleteDepartmentAsync(int id)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department != null)
        {
            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
        }
    }
}