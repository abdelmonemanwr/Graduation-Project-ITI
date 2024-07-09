using ShippingSystem.Enumerations;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Task<IEnumerable<Order>> GetOrdersAsync(int pageNumber, int pageSize);

        Task<IEnumerable<Order>> GetOrdersByCustomerNameAsync(string name);

        Task<IEnumerable<Order>> GetMerchantOrdersAsync(string id);

        Task<IEnumerable<Order>> GetRepresentativeOrdersAsync(string id);

        Task<IEnumerable<Order>> FilterByStatus(OrderStatus status);

        Task<IEnumerable<Order>> FilterByStatusAndDate(OrderStatus status, DateTime startDate, DateTime endDate);

        Task<Order> CalculateTotalCost(Order order);

    }
}
