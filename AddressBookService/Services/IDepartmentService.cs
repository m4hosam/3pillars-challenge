public interface IDepartmentService
{
    Task<IEnumerable<Department>> GetAllDepartmentsAsync();
    Task<Department> GetDepartmentByIdAsync(int id);
    Task<Department> CreateDepartmentAsync(DepartmentDTO departmentDto);
    Task<Department> UpdateDepartmentAsync(int id, DepartmentDTO departmentDto);
    Task DeleteDepartmentAsync(int id);
}
