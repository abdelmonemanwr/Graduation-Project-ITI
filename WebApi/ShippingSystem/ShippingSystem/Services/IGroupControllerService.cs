using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;

namespace ShippingSystem.Services
{
    public interface IGroupControllerService
    {
        public Task<IEnumerable<Group>> GetAllGroupsAsync(int pageNumber, int pageSize);
        
        public Task<Group> GetGroupByIdAsync(string id);

        public Task<GroupDTO> GetGroupDTOByIdAsync(string id);


        public Task<Group?> GetGroupByNameAsync(string name);

        public Task<Group> AddGroupAsync(GroupDTO groupDTO);

        public Task UpdateGroupAsync(Group group, GroupDTO groupDTO);

        public Task DeleteGroupAsync(Group group);

        public Task Save();
    }
}