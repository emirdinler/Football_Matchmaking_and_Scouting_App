namespace CleanArchitecture.Application.DTOs.Player
{
    public class CreatePlayerDto
    {
        public int UserId { get; set; }
        public string Position { get; set; }
        public string Foot { get; set; }
        public string Bio { get; set; }
        public string PreferredPlayStyle { get; set; }
    }
}
