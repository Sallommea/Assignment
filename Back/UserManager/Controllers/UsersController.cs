using System.Collections;
using Microsoft.AspNetCore.Mvc;
using UserManager.DTOs;
using UserManager.Models;
using System.Linq.Expressions;
using System.Linq;

namespace UserManager.Controllers;

[ApiController]
[Route("users")]
public class UsersController : Controller
{
    #region Actions

    [HttpGet("get-paginated/{page:int}/{itemsPerPage:int}")]
    public ActionResult<GetPaginatedUsersDto> Paginate(int page = 0, int itemsPerPage = 5, bool GetAll = false)
    {
        var users = DbMock.Users.Skip((page/* - 1*/) * itemsPerPage).Take(itemsPerPage).Select(x => new UserDto
        {
            Id = x.Id,
            FirstName = x.FirstName,
            LastName = x.LastName,
            PersonalNumber = x.PersonalNumber,
            Email = x.Email,
            DateOfBirth = x.DateOfBirth,
            Category = DbMock.Categories.FirstOrDefault(cat => cat.Id == x.CategoryId),
            Status = DbMock.Statuses.FirstOrDefault(sta => sta.Id == x.StatusId)
        }).ToList();

        var getPaginatedUsers = new GetPaginatedUsersDto
        {
            Users = users,
            RowNumber = DbMock.Users.Count
        };
        return Ok(getPaginatedUsers);
    }

    [HttpGet("get-all")]
    public ActionResult<IEnumerable<UserDto>> GetAll()
    {
        var users = DbMock.Users.Select(x => new UserDto
        {
            Id = x.Id,
            FirstName = x.FirstName,
            LastName = x.LastName,
            PersonalNumber = x.PersonalNumber,
            Email = x.Email,
            DateOfBirth = x.DateOfBirth,
            Category = DbMock.Categories.FirstOrDefault(cat => cat.Id == x.CategoryId),
            Status = DbMock.Statuses.FirstOrDefault(sta => sta.Id == x.StatusId)
        }).ToList();
        return Ok(users);
    }

    [HttpGet("get-by-id/{id:int}")]
    public ActionResult<List<User>> GetById(int id)
    {
        var user = DbMock.Users.FirstOrDefault(x => x.Id == id);
        if (user == null) return NotFound();
        var result = new UserDto()
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            PersonalNumber = user.PersonalNumber,
            Email = user.Email,
            DateOfBirth = user.DateOfBirth,
            Category = DbMock.Categories.FirstOrDefault(cat => cat.Id == user.CategoryId),
            Status = DbMock.Statuses.FirstOrDefault(sta => sta.Id == user.StatusId)
        };

        return Ok(result);
    }

    [HttpPost("add-new")]
    public ActionResult AddNew(User user)
    {
        user.Id= DbMock.Users.Max(x => x.Id)+1;
        DbMock.Users.Add(user);
        return Accepted();
    }

    [HttpPut("update")]
    public ActionResult Update(User user)
    {
        var foundUser = DbMock.Users.FirstOrDefault(x => x.Id == user.Id);
        if (foundUser == null) return NotFound();
        foundUser.Email = user.Email;
        foundUser.FirstName = user.FirstName;
        foundUser.LastName = user.LastName;
        foundUser.PersonalNumber = user.PersonalNumber;
        foundUser.CategoryId = user.CategoryId;
        foundUser.StatusId = user.StatusId;
        foundUser.DateOfBirth = user.DateOfBirth;
        return Ok();
    }

    [HttpDelete("delete/{id:int}")]
    public ActionResult Delete(int id)
    {
        var user = DbMock.Users.FirstOrDefault(x => x.Id == id);
        if (user == null) return NotFound();
        DbMock.Users.Remove(user);
        return Ok();
    }

    [HttpPost("filter/{page:int}/{itemsPerPage:int}")]
    public ActionResult<List<UserDto>> GetFiltered(UsersFilterOptions filterOptions, int page = 0, int itemsPerPage = 5)
    {
        IEnumerable<User> query = new List<User>(DbMock.Users);

        if (filterOptions.HasFirstNameFilter) query = query.Where(x => x.FirstName.ToUpper().Contains(filterOptions.FirstNameFilter.ToUpper()));
        if (filterOptions.HasLastNameFilter) query = query.Where(x => x.LastName.ToUpper().Contains(filterOptions.LastNameFilter.ToUpper()));
        if (filterOptions.HasEmailFilter) query = query.Where(x => x.Email.ToUpper().Contains(filterOptions.EmailFilter.ToUpper()));
        if (filterOptions.HasCategoryIdFilter) query = query.Where(x => x.CategoryId == filterOptions.CategoryIdFilter);
        if (filterOptions.HasStatusIdFilter) query = query.Where(x => x.StatusId == filterOptions.StatusIdFilter);
        if (filterOptions.HasPersonalNumberFilter) query = query.Where(x => x.PersonalNumber == filterOptions.PersonalNumberFilter);
        if (filterOptions.HasDateOfBirthEndFilter) query = query.Where(x => x.DateOfBirth < filterOptions.DateOfBirthEnd);
        if (filterOptions.HasDateOfBirthStartFilter) query = query.Where(x => x.DateOfBirth > filterOptions.DateOfBirthStart);
        query = query.ToList();
        var users = query.Skip((page) * itemsPerPage).Take(itemsPerPage).Select(x => new UserDto
        {
            Id = x.Id,
            FirstName = x.FirstName,
            LastName = x.LastName,
            PersonalNumber = x.PersonalNumber,
            Email = x.Email,
            DateOfBirth = x.DateOfBirth,
            Category = DbMock.Categories.FirstOrDefault(cat => cat.Id == x.CategoryId),
            Status = DbMock.Statuses.FirstOrDefault(sta => sta.Id == x.StatusId)
        }).ToList();

        var result = new GetPaginatedUsersDto()
        {
            Users = users,
            RowNumber = query.Count()
        };

        return Ok(result);
    }

    #endregion
}