using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;
using ShippingSystem.Repositories;
using ShippingSystem.UnitOfWorks;

namespace ShippingSystem.Services
{
    public class GroupControllerService : IGroupControllerService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public GroupControllerService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<Group?>> GetAllGroupsAsync(int pageNumber, int pageSize)
        {
            return await unitOfWork.GroupRepository.GetGroupsAsync(pageNumber, pageSize);
        }

        public async Task<Group> GetGroupByIdAsync(string id)
        {
            return await unitOfWork.GroupRepository.GetById(id);
        }

        public async Task<GroupDTO> GetGroupDTOByIdAsync(string id)
        {
            var group = await unitOfWork.GroupRepository.GetById(id);
            return mapper.Map<GroupDTO>(group);
        }

        public async Task<Group?> GetGroupByNameAsync(string name)
        {
            return await unitOfWork.GroupRepository.GetGroupByNameAsync(name); ;
        }

        public async Task<Group> AddGroupAsync(GroupDTO groupDTO)
        {            
            var group = mapper.Map<Group>(groupDTO);

            group.DateAdded = DateTime.Now;
            group.NormalizedName = group.Name.ToUpper();
            group.ConcurrencyStamp = Guid.NewGuid().ToString();

            await unitOfWork.GroupRepository.Add(group);

            await unitOfWork.GroupRepository.Save();
            return group;
        }

        public async Task UpdateGroupAsync(Group existingGroup, GroupDTO groupDTO)
        {
            try
            {
                existingGroup.Name = groupDTO.Name;
                existingGroup.NormalizedName = groupDTO.Name.ToUpper();

                var existingPrivileges = existingGroup.Privileges.ToList();

                foreach (var existingPrivilege in existingPrivileges)
                {
                    if (!groupDTO.GroupPrivileges.Any(p => p.Privelege_Id == existingPrivilege.Privelege_Id))
                    {
                        await unitOfWork.GroupPrivilegeRepository.Delete(existingPrivilege);
                    }
                }

                foreach (var privilegeDTO in groupDTO.GroupPrivileges)
                {
                    var existingPrivilege = existingPrivileges.FirstOrDefault(p => p.Privelege_Id == privilegeDTO.Privelege_Id);

                    if (existingPrivilege != null) 
                    {
                        mapper.Map(privilegeDTO, existingPrivilege);
                    } 
                    else 
                    {
                        var newPrivilege = mapper.Map<GroupPrivilege>(privilegeDTO);
                        newPrivilege.Group_Id = existingGroup.Id;
                        existingGroup.Privileges.Add(newPrivilege);
                    }
                }

                await unitOfWork.GroupRepository.Update(existingGroup);
                await unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new DbUpdateConcurrencyException("Concurrency conflict occurred.", ex);
            }
        }

        public async Task DeleteGroupAsync(Group group)
        {
            List<GroupPrivilege> groupPrivileges = null;
            await Task.Run(async () =>
            {
                var allPrivileges = await unitOfWork.GroupPrivilegeRepository.GetAll();
                groupPrivileges = allPrivileges.Where(gp => gp.Group_Id == group.Id).ToList();
            });

            if (groupPrivileges != null)
            {
                foreach (var privilege in groupPrivileges)
                {
                    await unitOfWork.GroupPrivilegeRepository.Delete(privilege);
                }
            }

            await unitOfWork.GroupRepository.Delete(group);
            await unitOfWork.Save();
        }

        public async Task Save()
        {
            await unitOfWork.Save();
        }
    }
}