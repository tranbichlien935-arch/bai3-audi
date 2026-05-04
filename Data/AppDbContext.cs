using Microsoft.EntityFrameworkCore;
using bai3.Model; // Nhớ using cái thư mục Model vô nha

namespace bai3.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Khai báo 3 cái bảng sẽ được tạo trong Database
        public DbSet<AudiCar> AudiCars { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Lead> Leads { get; set; }
        public DbSet<ServiceAppointment> ServiceAppointments { get; set; }
    }
}