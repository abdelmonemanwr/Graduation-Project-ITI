using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public class GroupPrivilegeRepository : GenericRepository<GroupPrivilege>, IGroupPrivilegeRepository
    {
        private readonly ShippingContext context;

        public GroupPrivilegeRepository(ShippingContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<List<GroupPrivilege?>> GetGroupPrivilegesByGroupId(string groupId)
        {
            //return (await context.Roles.FirstOrDefaultAsync(g => g.Id == groupId))!.Privileges.ToList() ?? new List<GroupPrivilege?>();

            var group = await context.Roles.FirstOrDefaultAsync(g => g.Id == groupId);
            if (group != null)
            {
                return group.Privileges.ToList()!;
            }
            else
            {
                return new List<GroupPrivilege?>();
            }
        }
    }
}
