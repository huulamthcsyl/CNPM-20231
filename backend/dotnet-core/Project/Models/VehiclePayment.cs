using System.Text.Json.Serialization;

namespace Project.Models
{
    public class VehiclePayment
    {
        // Primary key
        public Guid? VehicleFeeId { get; set; }
        public Guid VehicleReceiptId { get; set; }

        // Properties
        public int Amount { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual VehicleReceipt? VehicleReceipt { get; set; }
        [JsonIgnore]
        public virtual VehicleFee? VehicleFee { get; set; }
    }
}
