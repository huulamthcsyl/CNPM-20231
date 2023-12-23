using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Project.Models.Models;
using System.Reflection.Emit;
using System.Security.Cryptography;

namespace Project.Models
{
    public class ProjectContext : DbContext
    {
        public ProjectContext() { }

        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options) { }

        public virtual DbSet<AbsentPerson> AbsentPeople { get; set; }
        public virtual DbSet<UserInfo> UserInfos { get; set; }
        public virtual DbSet<UserAccount> UserAccounts { get; set; }
        public virtual DbSet<Person> People { get; set; }
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
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserInfo>(e =>
            {
                e.HasKey(e => e.UserId).HasName("Pk_UserInfor_UserId");

                e.ToTable("UserInfo");

                e.Property(e => e.UserId).ValueGeneratedNever();

                e.Property(e => e.Name).IsUnicode(true);

                e.Property(e => e.Address).IsUnicode(true);
            });

            modelBuilder.Entity<UserAccount>(e =>
            {
                e.HasKey(e => e.UserId).HasName("Pk_UserAccount_UserName");

                e.Property(e => e.UserId).ValueGeneratedNever();

                e.ToTable("UserAccount");

                e.HasOne(p => p.UserInfo)
                    .WithOne(u => u.UserAccount)
                    .HasForeignKey<UserInfo>(p => p.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Person>(e =>
            {
                e.HasKey(e => e.PersonId).HasName("Pk_Person_PersonId");

                e.ToTable("Person");

                e.Property(e => e.PersonId).ValueGeneratedNever();

                e.Property(e => e.Name).IsUnicode(true);

                e.Property(e => e.HomeTown).IsUnicode(true);

                e.HasOne(p => p.Residence)
                    .WithMany(r => r.People)
                    .HasForeignKey(p => p.ResidenceId)
                    .HasConstraintName("Fk_Person_ResidenceId")
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<AbsentPerson>(e =>
            {
                e.HasKey(e => e.AbsentPersonId).HasName("Pk_AbsentPerson_AbsentPersonId");

                e.ToTable("AbsentPerson");

                e.Property(e => e.AbsentPersonId).ValueGeneratedNever();

                e.Property(e => e.Reason).IsUnicode(true);

                e.HasOne(e => e.Person)
                    .WithMany(p => p.AbsentPepple)
                    .HasForeignKey(e => e.PersonId)
                    .HasConstraintName("Fk_AbsentPerson_PersonId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Residence>(e => 
            {
                e.HasKey(e => e.ResidenceId).HasName("PK_Residence_ResidenceId");

                e.ToTable("Residence");

                e.Property(e => e.ResidenceId).ValueGeneratedNever();

                e.Property(e => e.Address).IsUnicode(true);
            });

            modelBuilder.Entity<Record>(e => 
            {
                e.HasKey(e => e.RecordId).HasName("Pk_Record_RecordId");

                e.ToTable("Record");

                e.Property(e => e.RecordId).ValueGeneratedNever();

                e.Property(e => e.OwnerRelationship).IsUnicode(true);

                e.Property(e => e.Action).IsUnicode(true);

                e.HasOne(e => e.Person)
                    .WithMany(p => p.Records)
                    .HasForeignKey(e => e.PersonId)
                    .HasConstraintName("Fk_Record_PersonId")
                    .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(e => e.Residence)
                    .WithMany(p => p.Records)
                    .HasForeignKey(e => e.ResidenceId)
                    .HasConstraintName("Fk_Record_ResidenceId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ResidenceFee>(e =>
            {
                e.HasKey(e => e.ResidenceFeeId).HasName("Pk_ResidenceFee_ResidenceFeeId");

                e.ToTable("ResidenceFee");

                e.Property(e => e.ResidenceFeeId).ValueGeneratedNever();

                e.Property(e => e.Name).IsUnicode(true);
            });

            modelBuilder.Entity<ResidencePayment>(e =>
            {
                e.HasKey(e => new { e.ResidenceReceiptId, e.ResidenceFeeId });

                e.ToTable("ResidencePayment");

                e.HasOne(e => e.ResidenceFee)
                    .WithMany(r => r.ResidencePayments)
                    .HasForeignKey(e => e.ResidenceFeeId)
                    .HasConstraintName("Fk_ResidencePayment_ResidenceFeeId")
                    .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(e => e.ResidenceReceipt)
                    .WithMany(r => r.ResidencePayments)
                    .HasForeignKey(e => e.ResidenceReceiptId)
                    .HasConstraintName("Fk_ResidenceReceipt_ResidenceReceiptId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ResidenceReceipt>(e =>
            {
                e.HasKey(e => e.ResidenceReceiptId).HasName("Pk_ResidenceReceipt_ResidenceReceiptId");

                e.ToTable("ResidenceReceipt");

                e.Property(e => e.ResidenceReceiptId).ValueGeneratedNever();

                e.Property(e => e.Description).IsUnicode(true);

                e.HasOne(e => e.Person)
                    .WithMany(p => p.ResidenceReceipts)
                    .HasForeignKey(e => e.PersonId)
                    .HasConstraintName("Fk_ResidenceReceipt_PersonId")
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<Vehicle>(e => 
            {
                e.HasKey(e => e.VehicleId);

                e.ToTable("Vehicle");

                e.Property(e => e.VehicleId).ValueGeneratedNever();

                e.Property(e => e.Category).IsUnicode(true);

                e.HasOne(e => e.Person)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(e => e.PersonId)
                    .HasConstraintName("Fk_Vehicle_PersonId")
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<VehicleReceipt>(e => 
            {
                e.HasKey(e => e.VehicleReceiptId);

                e.ToTable("VehicleReceipt");

                e.Property(e => e.VehicleReceiptId).ValueGeneratedNever();

                e.Property(e => e.Description).IsUnicode(true);

                e.HasOne(e => e.Vehicle)
                    .WithMany(v => v.VehicleReceipts)
                    .HasForeignKey(e => e.VehicleId)
                    .HasConstraintName("Fk_VehicleReceipt_VehicleId")
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<VehiclePayment>(e =>
            {
                e.HasKey(e => new {e.VehicleReceiptId, e.VehicleFeeId});

                e.ToTable("VehiclePayment");

                e.HasOne(e => e.VehicleFee)
                    .WithMany(v => v.VehiclePayments)
                    .HasForeignKey(e => e.VehicleFeeId)
                    .HasConstraintName("Fk_VehiclePayment_VehicleFeeId")
                    .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(e => e.VehicleReceipt)
                    .WithMany(v => v.VehiclePayments)
                    .HasForeignKey(e => e.VehicleReceiptId)
                    .HasConstraintName("Fk_VehiclePayment_VehicleReceiptId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<VehicleFee>(e =>
            {
                e.HasKey(e => e.VehicleFeeId).HasName("Pk_VehicleFee_VehicleFeeId");

                e.ToTable("VehicleFee");

                e.Property(e => e.VehicleFeeId).ValueGeneratedNever();

                e.Property(e => e.Name).IsUnicode(true);
            });

        }
    }
}
