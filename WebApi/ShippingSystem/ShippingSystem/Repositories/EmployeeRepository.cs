using Microsoft.EntityFrameworkCore;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public class EmployeeRepository : GenericRepository<Employee>,IEmployeeRepository
    {
        public EmployeeRepository(ShippingContext _db) : base(_db) { }

        public async Task<bool> DisableEmployee(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentException("The employee ID cannot be null or empty.", nameof(id));
            }

            var emp = await db.Employees.FindAsync(id);

            if (emp == null)
            {
                return false; 
            }

            emp.IsDeleted = true;

            return true;

            //try
            //{
            //    await db.SaveChangesAsync();
            //    return true; 
            //}
            //catch (Exception ex)
            //{
            //    return false;
            //}
        }

        public async  Task<IEnumerable<Employee>> GetActiveEmployee()
        {
            return await db.Employees.Where(e=>e.IsDeleted == false).ToListAsync();
        }

        public async Task<Employee> GetEmployeeByEmail(string email)
        {
           return await  db.Employees.FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task<Employee> GetEmployeeByName(string name)
        {
            return await db.Employees.FirstAsync(e => e.FullName == name);
        }
    }
}
