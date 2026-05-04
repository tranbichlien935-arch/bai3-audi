using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bai3.Model
{
    public class Contract
    {
        [Key]
        public string ContractId { get; set; } // Mã hợp đồng, VD: HD-2026-001

        // Liên kết với bảng Khách hàng
        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }

        // Liên kết với bảng Xe (Số VIN)
        [Required]
        public string CarId { get; set; }
        [ForeignKey("CarId")]
        public AudiCar AudiCar { get; set; }

        public DateTime ContractDate { get; set; } = DateTime.Now;

        public decimal TotalAmount { get; set; } // Tổng tiền chốt deal

        // Trạng thái: Chờ duyệt cọc, Đang làm thủ tục, Chờ giao xe, Đã bàn giao, Hủy
        public string Status { get; set; } = "Chờ duyệt cọc";

        public string SalePersonId { get; set; } // Mã nhân viên Sales chốt đơn này
    }
}