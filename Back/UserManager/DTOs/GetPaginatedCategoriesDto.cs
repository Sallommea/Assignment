using UserManager.Models;

namespace UserManager.DTOs;

public class GetPaginatedCategoriesDto
{
    public IEnumerable<Category> Categories { get; set; }
    public int RowNumber{ get; set; }
}