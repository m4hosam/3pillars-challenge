public class AddressBookEntry
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public int JobId { get; set; }
    public Job Job { get; set; }
    public int DepartmentId { get; set; }
    public Department Department { get; set; }
    public string MobileNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string PhotoPath { get; set; }
    public int Age { get; set; }
}