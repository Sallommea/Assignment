namespace UserManager.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string PersonalNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public int? CategoryId { get; set; }
    public int? StatusId { get; set; }
}