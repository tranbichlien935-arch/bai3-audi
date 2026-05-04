using System.ComponentModel.DataAnnotations;

namespace bai3.Model
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public string Phone { get; set; }

        public string? InterestedCar { get; set; } // Khách thích xe nào (VD: Audi Q5)

        public DateTime BookingDate { get; set; } // Ngày giờ hẹn lên Showroom

        // Loại lịch hẹn: "Lái thử" hoặc "Giữ xe"
        public string BookingType { get; set; } = "Lái thử";

        // Trạng thái: "Chờ xác nhận", "Đã xác nhận", "Hoàn tất", "Đã hủy"
        public string Status { get; set; } = "Chờ xác nhận";
    }
}