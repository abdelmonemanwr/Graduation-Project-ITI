using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs.Order;
using ShippingSystem.Enumerations;
using ShippingSystem.Models;
using System.Linq;

namespace ShippingSystem.Repositories
{
    public class ProductOrderRepository : GenericRepository<ProductOrder>,IProductOrderRepository
    {
        public ProductOrderRepository(ShippingContext _db ): base(_db) { }

        public void DeleteProductOrder(int orderId)
        {
             db.ProductOrders.RemoveRange(db.ProductOrders.Where(po=>po.Order_Id == orderId));
        }
    }
}
