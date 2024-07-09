using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShippingSystem.DTOs.Order;
using ShippingSystem.Enumerations;
using ShippingSystem.Services;

namespace ShippingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/Order?pageNumber=1&pageSize=10
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders(int pageNumber = 1, int pageSize = 10)
        {
            var orders = await _orderService.GetOrdersAsync(pageNumber, pageSize);
            return Ok(orders);
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        // GET: api/Order/customerName?name=JohnDoe
        [HttpGet("customerName")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByCustomerName(string name)
        {
            var orders = await _orderService.GetOrdersByCustomerNameAsync(name);
            return Ok(orders);
        }

        // GET: api/Order/merchantOrders/merchantId
        [HttpGet("merchantOrders/{merchantId}")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetMerchantOrders(string merchantId)
        {
            var orders = await _orderService.GetMerchantOrdersAsync(merchantId);
            return Ok(orders);
        }

        // GET: api/Order/representativeOrders/representativeId
        [HttpGet("representativeOrders/{representativeId}")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetRepresentativeOrders(string representativeId)
        {
            var orders = await _orderService.GetRepresentativeOrdersAsync(representativeId);
            return Ok(orders);
        }

        // POST: api/Order
        [HttpPost]
        public async Task<IActionResult> PostOrder(OrderDto orderDto)
        {
            var result = await  _orderService.PostOrderAsync(orderDto);
            if (result == false)
            {
                return BadRequest("Order could not be created.");
            }

            //return CreatedAtAction(nameof(GetOrder), new { id = orderDto.Id }, orderDto);
            return Ok(new {message = "order added succesfully"});
        }

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, OrderDto orderDto)
        {
            if (id != orderDto.Id)
            {
                return BadRequest("Order ID mismatch.");
            }

            await _orderService.PutOrderAsync(orderDto);
            return NoContent();
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _orderService.RemoveOrderAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // PUT: api/Order/assignRepresentative
        [HttpPut("assignRepresentative")]
        public async Task<IActionResult> AssignRepresentative(int orderId, string representativeId)
        {
            var result = await _orderService.AssignRepresentative(orderId, representativeId);
            if (!result)
            {
                return BadRequest("Assignment failed.");
            }

            return NoContent();
        }

        // GET: api/Order/filterByStatus?status=Pending
        [HttpGet("filterByStatus")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> FilterOrderByStatus(OrderStatus status)
        {
            var orders = await _orderService.FilterOrderByStatus(status);
            return Ok(orders);
        }

        // GET: api/Order/filterByStatusAndDate?status=Pending&startDate=2022-01-01&endDate=2022-12-31
        [HttpGet("filterByStatusAndDate")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> FilterOrderByStatusAndDate(OrderStatus status, DateTime startDate, DateTime endDate)
        {
            var orders = await _orderService.FilterOrderByStatusAndDate(status, startDate, endDate);
            return Ok(orders);
        }

        [HttpPut("ChangeStatus")]
        public async Task<IActionResult> ChangeStatus([FromQuery]int orderId,[FromQuery]OrderStatus status)
        {
            await _orderService.ChangeStatus(orderId,status);
            return Ok();
        }
    }
}
