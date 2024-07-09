using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {

        public Task<Employee> GetEmployeeByEmail(string email);

        public Task<Employee> GetEmployeeByName(string name);

        public Task<IEnumerable<Employee>> GetActiveEmployee();

        public Task<bool> DisableEmployee(string id);

        public Task<string> GetRoleIdByUserId(string userId);

    }
}
