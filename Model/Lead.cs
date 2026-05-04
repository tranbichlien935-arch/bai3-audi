using System.ComponentModel.DataAnnotations;

namespace bai3.Model
{
    public class Lead
    {
        [Key]
        public int LeadId { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Phone { get; set; }

        public string? Email { get; set; }

        public string? Notes { get; set; } // Ghi chú: "Khách giàu, chốt lẹ" 😂

        // Trạng thái: "Mới", "Đang tư vấn", "Chốt hụt"
        public string Status { get; set; } = "Mới";
    }
}