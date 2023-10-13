using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    [Table("Record")]
    public class Record
    {
        [Key]
        public Guid RecordId;
        public Guid ResidenceId;
        public Guid PersonId;
        public string Action;
        public DateTime? Date;
    }
}
