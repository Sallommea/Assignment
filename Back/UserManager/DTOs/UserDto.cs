using UserManager.Models;

namespace UserManager.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string PersonalNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Category Category { get; set; }
    public Status Status { get; set; }
}