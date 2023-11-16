using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Project.Models.Models
{
    public class UserInfo
    {
        //Primary key
        public Guid UserId { get; set; }

        // Properties
        public string Name { get; set; } = string.Empty.ToString();
        public string? IdentityCardNumber { get; set; }
        public string Address { get; set; } = string.Empty.ToString();
        public DateTime DateOfBirth { get; set; }
        public bool Gender { get; set; } = false;   
        public string? PhoneNumber { get; set; }

        // Navigation properties
        [JsonIgnore]
        public virtual UserAccount? UserAccount { get; set; }
    }
}
