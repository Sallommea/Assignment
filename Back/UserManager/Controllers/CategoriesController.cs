using Microsoft.AspNetCore.Mvc;
using UserManager.DTOs;
using UserManager.Models;

namespace UserManager.Controllers;

[ApiController]
[Route("categories")]
public class CategoriesController : Controller
{
    #region Actions

    [HttpGet("get-paginated/{page:int}/{itemsPerPage:int}")]
    public ActionResult<GetPaginatedCategoriesDto> Paginate(int page = 0, int itemsPerPage = 5)
    {
        var paginatedCategories = new GetPaginatedCategoriesDto
        {
            Categories = DbMock.Categories.Skip((page/* - 1*/) * itemsPerPage).Take(itemsPerPage),
            RowNumber = DbMock.Categories.Count
        };
        return Ok(paginatedCategories);
    }

    [HttpGet("get-all")]
    public ActionResult<IEnumerable<Category>> GetAll()
    {
        return Ok(DbMock.Categories);
    }

    [HttpGet("get-by-id/{id:int}")]
    public ActionResult<Category> GetById(int id)
    {
        var category = DbMock.Categories.FirstOrDefault(x => x.Id == id);
        if (category == null) return NotFound();
        return Ok(category);
    }

    [HttpPost("add-new/{name}")]
    public ActionResult AddNew(string name)
    {
        DbMock.Categories.Add(new Category()
        {
            Name = name,
            Id = DbMock.Categories.Max(x => x.Id) + 1
        });
        return Accepted();
    }

    [HttpPut("update/{id:int}/{name}")]
    public ActionResult Update(int id, string name)
    {
        var category = DbMock.Categories.FirstOrDefault(x => x.Id == id);
        if (category == null) return NotFound();
        category.Name = name;
        return Ok();
    }

    [HttpDelete("delete/{id:int}")]
    public ActionResult Delete(int id)
    {
        var category = DbMock.Categories.FirstOrDefault(x => x.Id == id);
        if (category == null) return NotFound();
        DbMock.Categories.Remove(category);
        return Ok();
    }

    [HttpGet("filter/{page:int}/{itemsPerPage:int}/{filterPhrase}")]
    public ActionResult<GetPaginatedCategoriesDto> GetFiltered(string filterPhrase, int page = 1, int itemsPerPage = 5)
    {
        var filteredCategories = new List<Category>(DbMock.Categories)
            .Where(x => x.Name.ToUpper().Contains(filterPhrase.ToUpper())).ToList();

        return Ok( new GetPaginatedCategoriesDto()
        {
            Categories = filteredCategories
                .Skip((page) * itemsPerPage)
                .Take(itemsPerPage),
            RowNumber = filteredCategories.Count()
        });
    }

    #endregion
}