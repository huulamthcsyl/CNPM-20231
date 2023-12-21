using System.Text.Json.Serialization;

namespace Project.Models.Models
{
    public class AbsentPerson
    {
        // Primary key
        public Guid AbsentPersonId { get; set; }
        // Foreign key
        public Guid? PersonId { get; set; }

        // Properties
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Reason { get; set; }
        public string? TemporaryStay { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual Person? Person { get; set; }
    }
}
