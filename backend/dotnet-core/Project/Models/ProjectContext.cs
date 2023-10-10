using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Project.Models
{
    public class ProjectContext : DbContext
    {
        public ProjectContext() { }
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options) { }

        public virtual DbSet<Absence> Absences { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
        public virtual DbSet<Record> Records { get; set; }
        public virtual DbSet<Residence> Residences { get; set; }
        public virtual DbSet<ResidenceFee> ResidenceFees { get; set; }
        public virtual DbSet<ResidencePayment> ResidencePayments { get; set; }
        public virtual DbSet<ResidenceReceipt> ResidenceReceipts { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<VehicleFee> VehicleFees { get; set;}
        public virtual DbSet<VehiclePayment> VehiclePayments { get; set;}
        public virtual DbSet<VehicleReceipt> VehicleReceipts { get;set; }

        
    }
}
