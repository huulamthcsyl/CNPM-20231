namespace Project.Models
{
    public class VehiclePayment
    {
        public Guid VehiclePaymentId { get; set; }
        public Guid VehicleFeeId { get; set; }
        public Guid VehicleId { get; set; }
        public DateTime? Date { get; set; }
        public int Amount { get; set;}
        public string Note { get; set;}
    }
}
