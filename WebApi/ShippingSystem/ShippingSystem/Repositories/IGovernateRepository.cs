using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IGovernateRepository : IGenericRepository<Governate>
    {
         Task<IEnumerable<Governate>> GetGovernatesAsync(int pageNumber, int pageSize);

        Task<Governate> GetGovernatesByNameAsync(string name);

    }
}
