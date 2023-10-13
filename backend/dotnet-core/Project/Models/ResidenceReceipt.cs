namespace Project.Models
{
    public class ResidenceReceipt
    {
        public Guid ResidenceReceiptId { get; set; }    
        public Guid PersonId { get; set; }
        public Guid ResidenceFeeId { get; set; } 
        public DateTime DateCreated { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; }
        public virtual Person Person { get; set; }  
        public virtual ICollection<ResidencePayment> ResidencePayments { get; set; } = new List<ResidencePayment>();
    }
}
