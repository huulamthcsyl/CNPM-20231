using System.Text.Json.Serialization;

namespace Project.Models.Models
{
    public class ResidencePayment
    {
        //Primary key
        public Guid ResidenceFeeId { get; set; }
        public Guid ResidenceReceiptId { get; set; }

        // Properties
        public int Amount { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual ResidenceReceipt? ResidenceReceipt { get; set; }
        [JsonIgnore]
        public virtual ResidenceFee? ResidenceFee { get; set; }
    }
}
