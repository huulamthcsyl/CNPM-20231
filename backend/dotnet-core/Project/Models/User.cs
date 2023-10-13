using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class User
    {
        // Primary key
        public int UserId { get; set; }

        // Properties
        public string Account { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }    
        public string? IdentityCardNumber { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool Gender { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
