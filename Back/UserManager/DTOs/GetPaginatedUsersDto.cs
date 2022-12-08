using UserManager.Models;

namespace UserManager.DTOs
{
    public class GetPaginatedUsersDto
    {
        public IEnumerable<UserDto> Users { get; set; }
        public int RowNumber{ get; set; }
    }
}
