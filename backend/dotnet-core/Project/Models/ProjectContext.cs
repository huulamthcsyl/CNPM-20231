using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Project.Models
{
    public partial class ProjectContext : DbContext
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                e.HasKey(e => e.UserId).HasName("Pk_Users_UserId");

                e.ToTable("User");

                e.Property(e => e.UserId).UseIdentityColumn(seed: -1, increment: 1);

                e.Property(e => e.Name).IsUnicode(true);
            });

            modelBuilder.Entity<Person>(e =>
            {
                e.HasKey(e => e.PersonId).HasName("Pk_People_PersonId");

                e.ToTable("Person");

                e.Property(e => e.Name).IsUnicode(true);

                e.Property(e => e.HomeTown).IsUnicode(true);

                e.HasOne(p => p.Residence).WithMany(r => r.Persons)
                    .HasForeignKey(p => p.ResidenceId)
                    .HasConstraintName("Fk_Person_ResidenceId")
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Absence>(e => 
            {
                e.HasKey(e => e.AbsenceId).HasName("Pk_Absence_AbsenceId");

                e.ToTable("Absence");

                e.Property(e => e.Reason).IsUnicode(true);

                e.HasOne(e => e.Person).WithOne(p => p.Absence)
                    .HasForeignKey<Person>(e => e.PersonId)
                    .HasConstraintName("Fk_Absence_PersonId")
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<Residence>(e => 
            {
                e.HasKey(e => e.ResidenceId).HasName("PK_Residence_ResidenceId");

                e.Property(e => e.OwnerName).IsUnicode(true);

                e.Property(e => e.Address).IsUnicode(true);
            });

            modelBuilder.Entity<Record>(e => 
            {
                e.HasKey(e => e.RecordId).HasName("Pk_Record_RecordId");

                e.ToTable("Record");

                e.Property(e => e.Action).IsUnicode(true);

                e.HasOne(e => e.Person).WithMany(p => p.Records)
                    .HasForeignKey(e => e.PersonId)
                    .HasConstraintName("Fk_Record_PersonId");

                e.HasOne(e => e.Residence).WithMany(p => p.Records)
                    .HasForeignKey(e => e.ResidenceId)
                    .HasConstraintName("Fk_Record_ResidenceId");
            });
        }
    }
}
