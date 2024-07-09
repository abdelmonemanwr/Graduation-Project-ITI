using ShippingSystem.Repositories;

namespace ShippingSystem.UnitOfWorks
{
    public interface IUnitOfWork
    {
        public IGovernateRepository GovernateRepository { get;}

        public ICityRepository CityRepository { get;}

        public IOrderRepository OrderRepository { get;}

        IEmployeeRepository EmployeeRepository {get;}

        IProductOrderRepository ProductOrderRepository { get;}

        public GroupRepository GroupRepository { get; }

        public PrivilegeRepository PrivilegeRepository { get; }

        public GroupPrivilegeRepository GroupPrivilegeRepository { get; }

        Task<int> Save();
    }
}
