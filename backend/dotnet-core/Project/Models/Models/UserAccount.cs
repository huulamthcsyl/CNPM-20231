using System.Text.Json.Serialization;

namespace Project.Models.Models
{
    public class UserAccount {  
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        [JsonIgnore]
        public virtual UserInfo? UserInfo { get; set; }
            
    }
}
