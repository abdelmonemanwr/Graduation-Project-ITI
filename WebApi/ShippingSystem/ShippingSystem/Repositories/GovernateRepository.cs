using Microsoft.EntityFrameworkCore;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public class GovernateRepository : GenericRepository<Governate>,IGovernateRepository
    {
        public GovernateRepository(ShippingContext _db ): base(_db) { }

       public async Task<IEnumerable<Governate>> GetGovernatesAsync(int pageNumber, int pageSize)
        {
            return await db.Governates
           .Skip((pageNumber - 1) * pageSize)
           .Take(pageSize)
           .ToListAsync();
        }

        public async Task<Governate> GetGovernatesByNameAsync(string name)
        {
            return await db.Governates.FirstOrDefaultAsync(g => g.Name == name);
        }
    }
}
