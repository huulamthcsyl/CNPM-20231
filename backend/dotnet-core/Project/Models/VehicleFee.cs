namespace Project.Models
{
    public class VehicleFee
    {
        public Guid VehicleFeeId { get; set; }  
        public string Name { get;}
        public int Cost { get; set; }
        public virtual ICollection<VehiclePayment> VehiclePayments { get; set; } = new List<VehiclePayment>();  
    }
}
