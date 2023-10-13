using System.Text.Json.Serialization;

namespace Project.Models
{
    public class ResidencePayment
    {
        public Guid ResidencePaymentId { get; set; }
        public Guid ResidenceFeeId { get; set; }
        public int Amount { get; set; }
        [JsonIgnore]
        public virtual ResidenceReceipt ResidenceReceipt { get; set; }
        [JsonIgnore]
        public virtual ResidenceFee ResidenceFee { get; set; }
    }
}
