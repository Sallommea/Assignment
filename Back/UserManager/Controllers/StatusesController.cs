using Microsoft.AspNetCore.Mvc;
using UserManager.DTOs;
using UserManager.Models;

namespace UserManager.Controllers;
[ApiController]
[Route("statuses")]
public class StatusesController : Controller
{
    #region Actions

    [HttpGet("get-paginated/{page:int}/{itemsPerPage:int}")]
    public ActionResult<GetPaginatedStatusesDto> Paginate(int page = 0, int itemsPerPage = 5)
    {
        var result = new GetPaginatedStatusesDto()
        {
            Statuses = DbMock.Statuses.Skip((page /*-1*/) * itemsPerPage).Take(itemsPerPage),
            RowNumber = DbMock.Statuses.Count
        };
        return Ok(result);
    }

    [HttpGet("get-all")]
    public ActionResult<IEnumerable<Status>> GetAll()
    {
        return Ok(DbMock.Statuses);
    }

    [HttpGet("get-by-id/{id:int}")]
    public ActionResult<Status> GetById(int id)
    {
        var status = DbMock.Statuses.FirstOrDefault(x => x.Id == id);
        if (status == null) return NotFound();
        return Ok(status);
    }

    [HttpPost("add-new/{name}")]
    public ActionResult AddNew(string name)
    {
        DbMock.Statuses.Add(new Status
        {
            Name = name,
            Id = DbMock.Statuses.Max((x => x.Id)) + 1
        });
        return Accepted();
    }

    [HttpPut("update/{id:int}/{name}")]
    public ActionResult Update(int id, string name)
    {
        var status = DbMock.Statuses.FirstOrDefault(x => x.Id == id);
        if (status == null) return NotFound();
        status.Name = name;
        return Ok();
    }

    [HttpDelete("delete/{id:int}")]
    public ActionResult Delete(int id)
    {
        var status = DbMock.Statuses.FirstOrDefault(x => x.Id == id);
        if (status == null) return NotFound();
        DbMock.Statuses.Remove(status);
        return Ok();
    }

    [HttpGet("filter/{page:int}/{itemsPerPage:int}/{filterPhrase}")]
    public ActionResult<GetPaginatedStatusesDto> GetFiltered(string filterPhrase, int page = 0, int itemsPerPage = 5)
    {
        var filteredStatuses = new List<Status>(DbMock.Statuses)
            .Where(x => x.Name.ToUpper().Contains(filterPhrase.ToUpper())).ToList();

        return Ok( new GetPaginatedStatusesDto()
        {
            Statuses = filteredStatuses
                .Skip((page) * itemsPerPage)
                .Take(itemsPerPage),
            RowNumber = filteredStatuses.Count()
        });
    }
    #endregion
}