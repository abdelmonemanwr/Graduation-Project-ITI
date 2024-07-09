using Microsoft.EntityFrameworkCore;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public class CityRepository : GenericRepository<City>,ICityRepository
    {
        public CityRepository(ShippingContext _db ): base(_db) { }

       public async Task<IEnumerable<City>> GetCitiesAsync(int pageNumber, int pageSize)
       {
            return await db.Cities
           .Skip((pageNumber - 1) * pageSize)
           .Take(pageSize)
           .ToListAsync();
       }

        public async Task<IEnumerable<City>> GetCitiesByGovernate(int id)
        {
            return await db.Cities.Where(c => c.Governate_Id == id).ToListAsync();
        }

        public async Task<City> GetCityByNameAsync(string name)
        {
            return await db.Cities.FirstOrDefaultAsync(g => g.Name == name);
        }
    }
}
