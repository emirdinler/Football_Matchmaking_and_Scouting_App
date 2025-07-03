namespace CleanArchitecture.Application.DTOs.Player
{
    public class PlayerDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Position { get; set; }
        public string Foot { get; set; }
        public decimal Rating { get; set; }
        public string Bio { get; set; }
        public string PreferredPlayStyle { get; set; }
    }
}
