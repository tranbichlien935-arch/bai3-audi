using Microsoft.AspNetCore.Mvc;

namespace bai3.ApiControllers
{
    [Route("api/inventory")]
    [ApiController]
    public class ApiInventoryController : ControllerBase
    {
        [HttpGet("check-vin/{vin}")]
        public IActionResult CheckVin(string vin)
        {
            return Ok(new { success = true, message = "Chi tiết lịch sử xe", data = new { VIN = vin, Status = "Đang rảnh, sẵn sàng bán", Location = "Kho Quận 9" } });
        }

        [HttpPost("import")]
        public IActionResult ImportCars()
        {
            return Ok(new { success = true, message = "Đã nhập thành công lô 10 chiếc Audi A6 từ Đức về kho!" });
        }

        [HttpPut("{vin}/pdi")]
        public IActionResult MarkPdiDone(string vin)
        {
            return Ok(new { success = true, message = $"Xe {vin} đã hoàn tất kiểm tra PDI. Sẵn sàng giao cho khách!" });
        }

        [HttpPost("handover")]
        public IActionResult HandoverCar(string vin)
        {
            return Ok(new { success = true, message = $"Xuất kho thành công! Chúc mừng khách hàng nhận xe {vin}." });
        }
    }
}