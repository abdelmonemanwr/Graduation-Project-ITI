using AutoMapper;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.DTOs.Privileges;
using ShippingSystem.Models;
using ShippingSystem.Repositories;
using ShippingSystem.UnitOfWorks;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ShippingSystem.Services
{
    public class PrivilegeControllerService : IPrivilegeControllerService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public PrivilegeControllerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<List<PrivilegeDTO?>> GetAllPrivilegesAsync()
        {
            var privileges = await unitOfWork.PrivilegeRepository.GetAll();
            return mapper.Map<List<PrivilegeDTO?>>(privileges);
        }

        public async Task<PrivilegeDTO?> GetPrivilegeNameById(int id)
        {
            var privilege = unitOfWork.PrivilegeRepository.GetById(id);
            if(privilege == null)
            {
                return await Task.FromResult<PrivilegeDTO?>(null);
            }
            return await Task.FromResult(mapper.Map<PrivilegeDTO?>(privilege));
        }
    }
}
