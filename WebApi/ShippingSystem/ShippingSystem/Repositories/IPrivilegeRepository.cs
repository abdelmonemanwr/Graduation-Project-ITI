using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IPrivilegeRepository : IGenericRepository<Privilege>
    {
        Task<Privilege> GetPrivilegeByNameAsync(string name);
        Task<IEnumerable<Privilege>> GetPrivilegesAsync(int pageNumber, int pageSize);
    }
}
