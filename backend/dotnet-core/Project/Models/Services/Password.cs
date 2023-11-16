namespace Project.Models.Services
{
    public class Password
    {
        public Guid Id { get; set; }
        public string OldPassWord { get; set; }
        public string NewPassWord { get; set;}
    }
}
