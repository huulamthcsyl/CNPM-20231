using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class UserInfor
    {
        // Primary key
        public Guid UserId { get; set; }

        // Properties
        public string Name { get; set; }    
        public string? IdentityCardNumber { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool Gender { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
