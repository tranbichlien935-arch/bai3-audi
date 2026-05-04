using System.ComponentModel.DataAnnotations;

namespace bai3.Model
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Phone { get; set; }

        public string Email { get; set; }

        public string Cccd { get; set; } // Căn cước công dân để làm giấy tờ xe

        // Hạng thành viên: Silver, Gold, Platinum
        public string MembershipTier { get; set; } = "Silver";
    }
}