using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    [Table("Vehicle")]
    public class Vehicle
    {
        public Guid VehicleId { get; set; }
        public Guid PersonId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string LicensePlate { get; set; }
        public Person Person { get; set; }
    }
}
