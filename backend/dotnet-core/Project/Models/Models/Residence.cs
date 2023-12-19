using System.Text.Json.Serialization;

namespace Project.Models.Models
{
    public class Residence
    {
        // Primary key
        public Guid ResidenceId { get; set; }

        // Properties
        public int MemberNumber { get; set; }
        public string Address { get; set; }
        public Guid OwnerId { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual ICollection<Record>? Records { get; set; } = new List<Record>();
        public virtual ICollection<Person>? People { get; set; } = new List<Person>();
    }
}
