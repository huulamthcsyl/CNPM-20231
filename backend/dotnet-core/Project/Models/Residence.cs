using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    [Table("Residence")]
    public class Residence
    {
        [Key]
        public Guid ResidenceId;
        public int MenberNumber;
        public string Address;
        public string OwnerName;
    }
}
