using AutoMapper;
using ShippingSystem.DTOS.City;
using ShippingSystem.Models;
using ShippingSystem.UnitOfWorks;

namespace ShippingSystem.Services
{
    public class CityService
    {
        private readonly IUnitOfWork unit;
        private readonly IMapper mapper;

        public CityService(IUnitOfWork _unit , IMapper _mapper)
        {
            unit = _unit;
            mapper = _mapper;
        }


        public async Task<IEnumerable<CityDto>> GetCitiesAsync(int pageNumber, int pageSize)
        {
            var cities = await unit.CityRepository.GetCitiesAsync(pageNumber, pageSize);  

            return mapper.Map<IEnumerable<CityDto>>(cities);
        }

        public async Task<CityDto> GetCityByIdAsync(int id)
        {
            var city = await unit.CityRepository.GetById(id);
            return mapper.Map<CityDto>(city);
        }

        public async Task<CityDto> GetCityByNameAsync(string name)
        {
            var city = await unit.CityRepository.GetCityByNameAsync(name);
            return mapper.Map<CityDto>(city);
        }

        public async Task<IEnumerable<CityDto>> GetCityByGovernateAsync(int id)
        {
            var cities = await unit.CityRepository.GetCitiesByGovernate(id);

            return mapper.Map<IEnumerable<CityDto>>(cities);
        }


        public async Task PostCityAsync(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            await unit.CityRepository.Add(city);
            await unit.Save();

        }

        public async Task PutCityAsync(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);

            await unit.CityRepository.Update(city);

            await unit.Save();
        }

        public async Task<bool> RemoveCityAsync(int id )
        {
            var city = await unit.CityRepository.GetById(id);

            if (city == null)
            {
                return false;
               
            }
            await unit.CityRepository.Delete(city);
            await unit.Save();

            return true;

        }
    }
}
