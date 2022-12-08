using UserManager.Models;

namespace UserManager.DTOs
{
    public class GetPaginatedStatusesDto
    {
        public IEnumerable<Status> Statuses { get; set; }
        public int RowNumber{ get; set; }
    }
}
