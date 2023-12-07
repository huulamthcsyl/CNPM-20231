using NuGet.Packaging.Signing;
using Project.Models.Models;

namespace Project.Models.Services
{
    public class ResidenceFeeInfo : ResidenceFee
    {
        public int PaidQuantity { get; set; }
        public int Total { get; set; }
        public ICollection<ResidenceReceiptInfo>? residenceReceipts { get; set; }

    }
}
