public class AddressBookEntry
{
    public int Id { get; set; }
    public required string FullName { get; set; }
    public int JobId { get; set; }
    public required Job Job { get; set; }
    public int DepartmentId { get; set; }
    public required Department Department { get; set; }
    public required string MobileNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string? Address { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string? PhotoPath { get; set; }
    public int Age { get; set; }
}