using System.Text.Json.Serialization;

namespace Project.Models
{
    public partial class Person
    {
        public Guid PersonId;
        public string Name;
        public DateTime DateOfBirth;
        public Guid? ResidenceId;
        public string? IdentityCardNumber;
        public bool Gender;
        public string? PhoneNumber;
        public string HomeTown;
        public string? OwnerRelationship;
        public Guid? OwnerId;
        public string Status;

        [JsonIgnore]
        public virtual ICollection<Record>? Records { get; set; } = new List<Record>();
        public virtual Residence? Residence { get; set; }
        public virtual Absence? Absence { get; set; }
        public virtual ICollection<ResidenceReceipt>? ResidenceReceipts { get; set; } = new List<ResidenceReceipt>();
        public virtual ICollection<Vehicle>? Vehicles { get; set; } = new List<Vehicle>();
    }
}
