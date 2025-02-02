public class AddressBookEntryDTO
{
    public string FullName { get; set; }
    public int JobId { get; set; }
    public int DepartmentId { get; set; }
    public string MobileNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public IFormFile Photo { get; set; }
}

public class AddressBookEntryDTOPartial
{
    public string FullName { get; set; }
    public int JobId { get; set; }
    public int DepartmentId { get; set; }
    public string MobileNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string? Password { get; set; }
    public IFormFile? Photo { get; set; }
}
