using Project.Models.Models;

namespace Project.Models.Services
{
    public class VehicleReceiptInfo : VehicleReceipt
    {
        public string? LicensePlate { get; set; }
        public string? OwnerName { get; set; }
    }
}
