using System.ComponentModel.DataAnnotations;

namespace bai3.Model
{
    public class ServiceAppointment
    {
        [Key]
        public int ServiceId { get; set; }

        [Required]
        public string CarVin { get; set; } // Số khung xe cần bảo dưỡng

        public string CustomerName { get; set; }

        public DateTime AppointmentDate { get; set; } // Ngày hẹn đem xe tới xưởng

        public string ServiceType { get; set; } = "Bảo dưỡng định kỳ 10.000km";

        public string Status { get; set; } = "Chờ xử lý";
    }
}