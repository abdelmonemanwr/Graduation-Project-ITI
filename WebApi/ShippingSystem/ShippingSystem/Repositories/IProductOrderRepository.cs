using ShippingSystem.Enumerations;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IProductOrderRepository : IGenericRepository<ProductOrder>
    {

        void DeleteProductOrder(int orderId);
    }
}
