namespace UserManager.Models;

public class UsersFilterOptions
{
    public string EmailFilter { get; set; }
    public string PersonalNumberFilter { get; set; }
    public string FirstNameFilter { get; set; }
    public string LastNameFilter { get; set; }
    public DateTime? DateOfBirthStart { get; set; }
    public DateTime? DateOfBirthEnd { get; set; }
    public int? CategoryIdFilter { get; set; }
    public int? StatusIdFilter { get; set; }

    public bool HasEmailFilter => !string.IsNullOrWhiteSpace(EmailFilter);
    public bool HasPersonalNumberFilter => !string.IsNullOrWhiteSpace(PersonalNumberFilter);
    public bool HasLastNameFilter => !string.IsNullOrWhiteSpace(LastNameFilter);
    public bool HasFirstNameFilter => !string.IsNullOrWhiteSpace(FirstNameFilter);
    public bool HasDateOfBirthStartFilter => DateOfBirthStart != null; 
    public bool HasDateOfBirthEndFilter => DateOfBirthEnd != null; 
    public bool HasCategoryIdFilter => CategoryIdFilter != null;
    public bool HasStatusIdFilter => StatusIdFilter != null;
}