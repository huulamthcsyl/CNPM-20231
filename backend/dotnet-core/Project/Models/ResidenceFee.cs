namespace Project.Models
{
    public class ResidenceFee
    {
        // Primary key
        public Guid ResidenceFeeId { get; set; }

        // Properties
        public string Name { get; set; }
        public bool IsObligatory { get; set; }
        public int? Cost { get; set; }

        // Navigation properties
        public virtual ICollection<ResidencePayment> ResidencePayments { get; set; } = new List<ResidencePayment>();
    }
}
