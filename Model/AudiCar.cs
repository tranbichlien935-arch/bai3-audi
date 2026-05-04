using System.ComponentModel.DataAnnotations;

namespace bai3.Model
{
    public class AudiCar
    {
        [Key]
        [StringLength(17)] // Số VIN tiêu chuẩn quốc tế là 17 ký tự
        public string CarId { get; set; } // Mã số khung (VIN)

        [Required]
        public string ModelName { get; set; } // VD: Audi Q8 S-line

        public string SeriesId { get; set; } // VD: Q-Series, A-Series

        public string Color { get; set; }

        public decimal Price { get; set; } // Giá bán

        public int StockQuantity { get; set; } // Tồn kho (thường là 1 vì mỗi xe 1 số VIN riêng biệt)

        // Trạng thái xe: Sẵn sàng, Đã cọc, Đã bán
        public string Status { get; set; } = "Sẵn sàng";
    }
}