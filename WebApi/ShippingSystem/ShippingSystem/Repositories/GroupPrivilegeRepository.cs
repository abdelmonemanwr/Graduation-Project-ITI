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
    }
}
