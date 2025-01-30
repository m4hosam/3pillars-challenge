using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly IDepartmentService _departmentService;

    public DepartmentsController(IDepartmentService departmentService)
    {
        _departmentService = departmentService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
    {
        return Ok(await _departmentService.GetAllDepartmentsAsync());
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Department>> GetDepartment(int id)
    {
        var department = await _departmentService.GetDepartmentByIdAsync(id);
        if (department == null) return NotFound();
        return Ok(department);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Department>> CreateDepartment(DepartmentDTO departmentDto)
    {
        var department = await _departmentService.CreateDepartmentAsync(departmentDto);
        return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, department);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDepartment(int id, DepartmentDTO departmentDto)
    {
        var department = await _departmentService.UpdateDepartmentAsync(id, departmentDto);
        if (department == null) return NotFound();
        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDepartment(int id)
    {
        await _departmentService.DeleteDepartmentAsync(id);
        return NoContent();
    }
}