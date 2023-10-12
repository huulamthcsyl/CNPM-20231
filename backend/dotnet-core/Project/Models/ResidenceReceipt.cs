namespace Project.Models
{
    public class ResidenceReceipt
    {
        // Primary key
        public Guid ResidenceReceiptId { get; set; }   
        
        // Foreign keys
        public Guid PersonId { get; set; }

        // Properties
        public DateTime DateCreated { get; set; }
        public int Amount { get; set; }
        public string? Description { get; set; }

        // Navigation properties
        public virtual Person Person { get; set; }  
        public virtual ICollection<ResidencePayment> ResidencePayments { get; set; } = new List<ResidencePayment>();
    }
}
