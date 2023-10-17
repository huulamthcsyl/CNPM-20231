using NuGet.Packaging.Signing;

namespace Project.Models
{
    public class ResidenceFeeInfor : ResidenceFee
    {
        public int PaidQuantity { get; set; }
        public int Total { get; set; } 
    }
}
