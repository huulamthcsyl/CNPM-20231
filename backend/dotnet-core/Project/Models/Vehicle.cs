using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    public class Vehicle
    {
        // Primay key
        public Guid VehicleId { get; set; }

        // Foreign key
        public Guid PersonId { get; set; }

        // Properties
        public string Name { get; set; }
        public string Category { get; set; }
        public string LicensePlate { get; set; }

        // Navigation properties
        public virtual Person Person { get; set; }
        public virtual ICollection<VehicleReceipt> VehicleReceipts { get; set; } = new List<VehicleReceipt>(); 
    }
}
