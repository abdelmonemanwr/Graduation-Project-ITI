using ShippingSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace ShippingSystem.Repositories
{
    public class PrivilegeRepository : GenericRepository<Privilege>, IPrivilegeRepository
    {
        private readonly ShippingContext db;

        public PrivilegeRepository(ShippingContext db) : base(db)
        {
            this.db = db;
        }

        public async Task<Privilege?> GetPrivilegeByNameAsync(string name)
        {
            return await db.Privileges.FirstOrDefaultAsync(p => p.Name == name);
        }

        public async Task<IEnumerable<Privilege?>> GetPrivilegesAsync(int pageNumber, int pageSize)
        {
            return await db.Privileges.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        }
    }
}
