using Microsoft.AspNetCore.Mvc;

namespace bai3.ApiControllers
{
    [Route("api/reports")]
    [ApiController]
    public class ApiReportController : ControllerBase
    {
        [HttpGet("revenue")]
        public IActionResult GetRevenue()
        {
            return Ok(new { success = true, data = new { TotalRevenue = "50,000,000,000 VND", Profit = "5,000,000,000 VND", Month = "Tháng 4/2026" } });
        }

        [HttpGet("top-selling")]
        public IActionResult GetTopSelling()
        {
            return Ok(new { success = true, data = new[] { "Audi Q5", "Audi A4", "Audi e-tron" } });
        }

        [HttpGet("inventory-aging")]
        public IActionResult GetInventoryAging()
        {
            return Ok(new { success = true, message = "Danh sách xe tồn kho trên 90 ngày", total = 3 });
        }
    }
}