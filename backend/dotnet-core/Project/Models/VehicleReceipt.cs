using System.Text.Json.Serialization;

namespace Project.Models
{
    public class VehicleReceipt
    {
        // Primary key
        public Guid VehicleReceiptId { get; set; }

        // Foreign keys
        public Guid? VehicleId { get; set; }

        // Properties
        public DateTime DateCreated { get; set; }
        public int Amount { get; set; } 
        public string? Description { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual Vehicle? Vehicle { get; set; }    
        public virtual ICollection<VehiclePayment>? VehiclePayments { get; set; } = new List<VehiclePayment>();
    }
}
