using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    public interface IGroupRepository : IGenericRepository<Group>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public Task<Group?> GetGroupByNameAsync(string groupName);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public Task<IEnumerable<Group?>> GetGroupsAsync(int pageNumber, int pageSize);
    }
}