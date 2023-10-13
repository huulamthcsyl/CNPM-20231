using System.Text.Json.Serialization;

namespace Project.Models
{
    public class Absence
    {
        public Guid AbsenceId { get; set; }
        public Guid PersonId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set;}
        public string Reason { get; set; }
        public string TemporaryStay { get; set; }
        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}
