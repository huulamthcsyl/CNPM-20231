using Project.Models.Models;

namespace Project.Models.Services
{
    public class VehicleFeeInfo : VehicleFee
    {
        public int PaidQuantity { get; set; }
        public int Total { get; set; }
    }
}
