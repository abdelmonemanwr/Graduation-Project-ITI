using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface ICityRepository : IGenericRepository<City>
    {
        Task<IEnumerable<City>> GetCitiesAsync(int pageNumber, int pageSize);

        Task<City> GetCityByNameAsync(string name);

        Task<IEnumerable<City>> GetCitiesByGovernate(int id);


    }
}
