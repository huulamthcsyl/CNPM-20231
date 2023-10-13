namespace Project.Models
{
    public class VehicleFee
    {
        // Primary key
        public Guid VehicleFeeId { get; set; }

        // Properties
        public string Name { get;}
        public int? Cost { get; set; }

        // Navigation property
        public virtual ICollection<VehiclePayment> VehiclePayments { get; set; } = new List<VehiclePayment>();  
    }
}
