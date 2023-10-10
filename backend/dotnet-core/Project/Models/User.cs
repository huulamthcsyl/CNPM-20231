using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public string? IdentityCardNumber;
        public DateTime DateOfBirth;
        public bool Gender;
        public string? PhoneNumber;
        public string? HomeTown;
    }
}
