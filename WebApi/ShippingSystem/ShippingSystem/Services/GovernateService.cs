using AutoMapper;
using ShippingSystem.DTOS.Governate;
using ShippingSystem.Models;
using ShippingSystem.UnitOfWorks;

namespace ShippingSystem.Services
{
    public class GovernateService
    {
        private readonly IUnitOfWork unit;
        private readonly IMapper mapper;

        public GovernateService(IUnitOfWork _unit , IMapper _mapper)
        {
            unit = _unit;
            mapper = _mapper;
        }


        public async Task<IEnumerable<GovernateDto>> GetGovernatesAsync(int pageNumber, int pageSize)
        {
            var governates = await unit.GovernateRepository.GetGovernatesAsync(pageNumber, pageSize);

            return mapper.Map<IEnumerable<GovernateDto>>(governates);
        }

        public async Task<GovernateDto> GetGovernatesByIdAsync(int id)
        {
            var governate = await unit.GovernateRepository.GetById(id);
            return mapper.Map<GovernateDto>(governate);

        }

        public async Task<GovernateDto> GetGovernatesByNameAsync(string name)
        {
            var governate = await unit.GovernateRepository.GetGovernatesByNameAsync(name);
            return mapper.Map<GovernateDto>(governate);
        }


        public async Task PostGovernateAsync(GovernateDto governateDto)
        {
            var governate = mapper.Map<Governate>(governateDto);
            await unit.GovernateRepository.Add(governate);
            await unit.Save();

        }

        public async Task PutGovernateAsync(GovernateDto governateDto)
        {
            var governate = mapper.Map<Governate>(governateDto);

            await unit.GovernateRepository.Update(governate);

            await unit.Save();
        }

        public async Task<bool> RemoveGovernateAsync(int id )
        {
            var governate = await unit.GovernateRepository.GetById(id);

            if (governate == null)
            {
                return false;
               
            }
            await unit.GovernateRepository.Delete(governate);
            await unit.Save();

            return true;

        }
    }
}
