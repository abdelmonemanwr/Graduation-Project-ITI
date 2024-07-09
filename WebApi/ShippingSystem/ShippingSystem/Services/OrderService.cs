﻿using AutoMapper;
using ShippingSystem.DTOs.Order;
using ShippingSystem.Enumerations;
using ShippingSystem.Models;
using ShippingSystem.UnitOfWorks;

namespace ShippingSystem.Services
{
    public class OrderService
    {
        private readonly IUnitOfWork unit;
        private readonly IMapper mapper;

        public OrderService(IUnitOfWork _unit , IMapper _mapper)
        {
            unit = _unit;
            mapper = _mapper;
        }


        public async Task<IEnumerable<OrderDto>> GetOrdersAsync(int pageNumber, int pageSize)
        {
            var orders = await unit.OrderRepository.GetOrdersAsync(pageNumber, pageSize);

            return mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<OrderDto> GetOrderByIdAsync(int id)
        {
            var order = await unit.OrderRepository.GetById(id);
            return mapper.Map<OrderDto>(order);

        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByCustomerNameAsync(string name)
        {
            var orders = await unit.OrderRepository.GetOrdersByCustomerNameAsync(name);
            return mapper.Map<IEnumerable<OrderDto>>(orders);
        }


        public async Task<IEnumerable<OrderDto>> GetMerchantOrdersAsync (string merchantId)
        {
            var orders = await unit.OrderRepository.GetOrdersByCustomerNameAsync(merchantId);
            return mapper.Map<IEnumerable<OrderDto>>(orders);
        }


        public async Task<IEnumerable<OrderDto>> GetRepresentativeOrdersAsync(string Representativeid)
        {
            var orders = await unit.OrderRepository.GetOrdersByCustomerNameAsync(Representativeid);
            return mapper.Map<IEnumerable<OrderDto>>(orders);
        }


        public async Task<bool> PostOrderAsync(OrderDto OrderDto)
        {
            var Order = mapper.Map<Order>(OrderDto);

           return  await unit.OrderRepository.AddOrder(Order);
            

        }

        public async Task PutOrderAsync(OrderDto OrderDto)
        {
            var order = mapper.Map<Order>(OrderDto);

            await unit.OrderRepository.Update(order);

            await unit.Save();
        }

        public async Task<bool> RemoveOrderAsync(int id )
        {
            var order = await unit.OrderRepository.GetById(id);

            if (order == null)
            {
                return false;
               
            }
            await unit.OrderRepository.Delete(order);
            await unit.Save();

            return true;

        }

        public async Task<bool> AssignRepresentative(int orderId , string representativeId)
        {
            var order = await unit.OrderRepository.GetById(orderId);
            if(order == null)
            {
                return false;
            }

            order.Representative_Id = representativeId;
            return true;
        }

        public async Task<IEnumerable<OrderDto>> FilterOrderByStatus(OrderStatus status)
        {

            var orders = await unit.OrderRepository.FilterByStatus(status);

            if(orders == null)
            {
                return null;
            }

            else 
                return mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<IEnumerable<OrderDto>> FilterOrderByStatusAndDate(OrderStatus status, DateTime startDate , DateTime endDate)
        {

            var orders = await unit.OrderRepository.FilterByStatusAndDate(status, startDate, endDate);

            if (orders == null)
            {
                return null;
            }

            else
                return mapper.Map<IEnumerable<OrderDto>>(orders);
        }

    }
}
