using UserManager.Models;

namespace UserManager;

public static class DbMock
{
    public static List<User> Users = new()
    {
        new User
        {
            Id = 1,
            Email = "mail1@mail.com",
            CategoryId = 1,
            FirstName = "Becky",
            LastName = "Thatcher",
            PersonalNumber = "01011091701",
            StatusId = 1,
            DateOfBirth = new DateTime(year: 1995, month: 1, day: 29)
        },
        new User
        {
            Id = 2,
            Email = "mail2@mail.com",
            CategoryId = 2,
            FirstName = "Hermione",
            LastName = "Granger",
            PersonalNumber = "01011091200",
            StatusId = 3,
            DateOfBirth = new DateTime(year: 1991, month: 3, day: 29)
        },
        new User
        {
            Id = 3,
            Email = "mail3@mail.com",
            CategoryId = 3,
            FirstName = "John",
            LastName = "Tolkien",
            PersonalNumber = "010110915589",
            StatusId = 4,
            DateOfBirth = new DateTime(year: 1991, month: 3, day: 29)
        },
        new User
        {
            Id = 4,
            Email = "mail4@mail.com",
            CategoryId = 2,
            FirstName = "Harry",
            LastName = "Potter",
            PersonalNumber = "01011091455",
            StatusId = 4,
            DateOfBirth = new DateTime(year: 1991, month: 3, day: 29)
        },
        new User
        {
            Id = 5,
            Email = "mail5@mail.com",
            CategoryId = 1,
            FirstName = "David",
            LastName = "Copperfield",
            PersonalNumber = "01011091533",
            StatusId = 5,
            DateOfBirth = new DateTime(year: 1991, month: 3, day: 29)
        },
        new User
        {
            Id = 6,
            Email = "mail6@mail.com",
            CategoryId = 2,
            FirstName = "Sherlock",
            LastName = "Holmes",
            PersonalNumber = "01011091503",
            StatusId = 4,
            DateOfBirth = new DateTime(year: 1999, month: 3, day: 29)
        },
        new User
        {
            Id = 7,
            Email = "mail7@mail.com",
            CategoryId = 4,
            FirstName = "Atticus",
            LastName = "Finch",
            PersonalNumber = "01011091504",
            StatusId = 5,
            DateOfBirth = new DateTime(year: 1990, month: 3, day: 29)
        },
        new User
        {
            Id = 8,
            Email = "mail8@mail.com",
            CategoryId = 1,
            FirstName = "Giovanni",
            LastName = "Boccaccio",
            PersonalNumber = "01011091505",
            StatusId = 1,
            DateOfBirth = new DateTime(year: 1995, month: 3, day: 29)
        },
        new User
        {
            Id = 9,
            Email = "mail9@mail.com",
            CategoryId = 2,
            FirstName = "Pippi",
            LastName = "Longstocking",
            PersonalNumber = "01011091324",
            StatusId = 1,
            DateOfBirth = new DateTime(year: 1991, month: 3, day: 29)
        },
        new User
        {
            Id = 10,
            Email = "mail10@mail.com",
            CategoryId = 6,
            FirstName = "Jane",
            LastName = "Eyre",
            PersonalNumber = "01011091988",
            StatusId = 5,
            DateOfBirth = new DateTime(year: 1997, month: 3, day: 29)
        },
        new User
        {
            Id = 11,
            Email = "mail11@mail.com",
            CategoryId = 2,
            FirstName = "Bilbo",
            LastName = "Baggins",
            PersonalNumber = "0101109900",
            StatusId = 2,
            DateOfBirth = new DateTime(year: 1991, month: 3, day: 29)
        },
        new User
        {
            Id = 12,
            Email = "mail12@mail.com",
            CategoryId = 5,
            FirstName = "Ron",
            LastName = "Weasley",
            PersonalNumber = "01011091589",
            StatusId = 3,
            DateOfBirth = new DateTime(year: 1991, month: 3, day: 29)
        },
        new User
        {
            Id = 13,
            Email = "mail13@mail.com",
            CategoryId = 4,
            FirstName = "Jim",
            LastName = "Knopf",
            PersonalNumber = "01011091566",
            StatusId = 5,
            DateOfBirth = new DateTime(year: 1994, month: 3, day: 29)
        },
        new User
        {
            Id = 14,
            Email = "mail14@mail.com",
            CategoryId = 1,
            FirstName = "Someone",
            LastName = "Else",
            PersonalNumber = "01011091577",
            StatusId = 1,
            DateOfBirth = new DateTime(year: 1998, month: 3, day: 29)
        },
    };

    public static List<Category> Categories = new()
    {
        new Category
        {
            Id = 1,
            Name = "Vip User"
        },
        new Category
        {
            Id = 2,
            Name = "Idle User"
        },
        new Category
        {
            Id = 3,
            Name = "Three"
        },
        new Category
        {
            Id = 4,
            Name = "Four"
        },
        new Category
        {
            Id = 5,
            Name = "Five"
        },
        new Category
        {
            Id = 6,
            Name = "Six"
        },
        new Category
        {
            Id = 7,
            Name = "Seven"
        },
        new Category
        {
            Id = 8,
            Name = "Eight"
        },
        new Category
        {
            Id = 9,
            Name = "Nine"
        },
        new Category
        {
            Id = 10,
            Name = "Ten"
        }
    };

    public static List<Status> Statuses = new()
    {
        new Status
        {
            Id = 1,
            Name = "Active"
        },
        new Status
        {
            Id = 2,
            Name = "Locked"
        },
        new Status
        {
            Id = 3,
            Name = "Three"
        },
        new Status
        {
            Id = 4,
            Name = "Four"
        },
        new Status
        {
            Id = 5,
            Name = "Five"
        },
        new Status
        {
            Id = 6,
            Name = "Six"
        },
        new Status
        {
            Id = 7,
            Name = "Seven"
        },
        new Status
        {
            Id = 8,
            Name = "Eight"
        },
        new Status
        {
            Id = 9,
            Name = "Nine"
        },
        new Status
        {
            Id = 10,
            Name = "Ten"
        }
    };
}