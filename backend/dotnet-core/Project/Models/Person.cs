using System.Text.Json.Serialization;

namespace Project.Models
{
    public partial class Person
    {
        // Primary key
        public Guid PersonId;

        // Foreign key
        public Guid? ResidenceId;
        public Guid? OwnerId;

        // Properties
        public string Name;
        public DateTime DateOfBirth;
        public string? IdentityCardNumber;
        public bool Gender;
        public string? PhoneNumber;
        public string HomeTown;
        public string? OwnerRelationship;
        public string Status;

        // Navigation properties
        [JsonIgnore]
        public virtual ICollection<Record>? Records { get; set; } = new List<Record>();
        public virtual Residence? Residence { get; set; }
        public virtual AbsentPerson? AbsentPerson { get; set; }
        public virtual ICollection<ResidenceReceipt>? ResidenceReceipts { get; set; } = new List<ResidenceReceipt>();
        public virtual ICollection<Vehicle>? Vehicles { get; set; } = new List<Vehicle>();
    }
}
