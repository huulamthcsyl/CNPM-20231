using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }    
        public string? IdentityCardNumber;
        public DateTime DateOfBirth;
        public bool Gender;
        public string? PhoneNumber;
        public string? HomeTown;
    }
}
