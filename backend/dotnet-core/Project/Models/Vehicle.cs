using System.Text.Json.Serialization;

namespace Project.Models
{
    public class Vehicle
    {
        // Primay key
        public Guid VehicleId { get; set; }

        // Foreign key
        public Guid? PersonId { get; set; }

        // Properties
        public string Category { get; set; }
        public string LicensePlate { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual Person? Person { get; set; }
        [JsonIgnore]
        public virtual ICollection<VehicleReceipt>? VehicleReceipts { get; set; } = new List<VehicleReceipt>(); 
    }
}
