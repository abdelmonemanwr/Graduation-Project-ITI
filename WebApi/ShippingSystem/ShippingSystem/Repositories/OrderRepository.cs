using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs.Order;
using ShippingSystem.Enumerations;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public class OrderRepository : GenericRepository<Order>,IOrderRepository
    {
        public OrderRepository(ShippingContext _db ): base(_db) { }

        public async Task<IEnumerable<Order>> GetOrdersAsync(int pageNumber, int pageSize)
        {
            return await db.Orders
           .Skip((pageNumber - 1) * pageSize)
           .Take(pageSize)
           .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByCustomerNameAsync(string name)
        {
            return await db.Orders.Where(o=>o.CustomerName == name).ToListAsync();
        }


        public async Task<IEnumerable<Order>> GetMerchantOrdersAsync(string id )
        {
            return await db.Orders.Where(o => o.Merchant_Id == id).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetRepresentativeOrdersAsync(string id)
        {
            return await db.Orders.Where(r=> r.Representative_Id == id).ToListAsync();
        }

        public async Task<bool> AddOrder(Order order)
        {
            var totalCost =  order.OrderCost + order.ShippingType.AdditionalShippingValue ;

            var weightOptions = db.WeightOptions.FirstOrDefault();

            if(order == null || order.ProductOrders == null)
            {
                return false ;
            }

            if (order.VillageDeliver == true)
            {
                totalCost += db.VillageCosts.FirstOrDefault().Price ?? 0;
            }

            if (order.TotalWeight > weightOptions.MaximumWeight)
            {
                totalCost += (order.TotalWeight - weightOptions.MaximumWeight) * weightOptions.AdditionalKgPrice;
            }

            if (order.Merchant.SpecialPrices != null)
            {
                var hasCity = order.Merchant.SpecialPrices.Any(sp=> sp.City_Id == order.City_Id);
                if(hasCity != false)
                {
                    totalCost = order.Merchant.SpecialPrices.FirstOrDefault(sp => sp.City_Id == order.City_Id).TransportCost ?? 0;
                    order.TotalCost = totalCost;
                    await db.Orders.AddAsync(order);
                    await db.SaveChangesAsync();
                    return true;

                }
            }

            if (order.orderType == OrderTypeEnum.PickUp)
            {
                if (order.Merchant.SpecialPickupCost != null || order.Merchant.SpecialPickupCost != 0)
                {
                    totalCost += order.Merchant.SpecialPickupCost ?? 0;
                    order.TotalCost = totalCost;

                    await db.Orders.AddAsync(order);
                    await db.SaveChangesAsync();
                    return true;
                }
                else
                {
                    totalCost += order.City.PickUpCost;
                    order.TotalCost = totalCost;
                    await db.Orders.AddAsync(order);
                    await db.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                totalCost += order.City.NormalCost;
                order.TotalCost = totalCost;
                await db.Orders.AddAsync(order);
                await db.SaveChangesAsync();
                return true;

            }

        }


        public async Task<IEnumerable<Order>> FilterByStatusAndDate(OrderStatus status ,DateTime startDate ,DateTime endDate)
        {
            return await db.Orders.Where(o=> o.OrderStatus == status && o.OrderDate >= startDate && o.OrderDate <= endDate).ToListAsync();
        }

        public async Task<IEnumerable<Order>> FilterByStatus(OrderStatus status)
        {
            return await db.Orders.Where(o => o.OrderStatus == status).ToListAsync();
        }
    }
}
