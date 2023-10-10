namespace Project.Models
{
    public class ResidenceFee
    {
        public Guid ResidenceFeeI { get; set; }
        public string Name { get; set; }
        public bool IsObligatory { get; set; }
        public int Cost { get; set; }
        public virtual ICollection<ResidencePayment> ResidencePayments { get; set; } = new List<ResidencePayment>();
    }
}
