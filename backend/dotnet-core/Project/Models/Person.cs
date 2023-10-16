using System.Text.Json.Serialization;

namespace Project.Models
{
    public partial class Person
    {
        // Primary key
        public Guid PersonId { get; set; }

        // Foreign key
        public Guid? ResidenceId { get; set; }

        // Properties
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? IdentityCardNumber { get; set; }
        public bool Gender { get; set; }
        public string? PhoneNumber { get; set; }
        public string HomeTown { get; set; }
        public string? OwnerRelationship { get; set; }
        public string Status { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual ICollection<Record>? Records { get; set; } = new List<Record>();
        [JsonIgnore]
        public virtual Residence? Residence { get; set; }
        [JsonIgnore]
        public virtual ICollection<AbsentPerson>? AbsentPepple { get; set; } = new List<AbsentPerson>();
        [JsonIgnore]
        public virtual ICollection<ResidenceReceipt>? ResidenceReceipts { get; set; } = new List<ResidenceReceipt>();
        [JsonIgnore]
        public virtual ICollection<Vehicle>? Vehicles { get; set; } = new List<Vehicle>();
    }
}
