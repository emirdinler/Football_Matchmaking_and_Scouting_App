using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class Player : BaseEntity
{
    public int UserId { get; set; }
    public string Position { get; set; }
    public string Foot { get; set; }
    public decimal Rating { get; set; }
    public string Bio { get; set; }
    public string PreferredPlayStyle { get; set; }

    public User User { get; set; }
    public ICollection<TeamPlayer> TeamPlayers { get; set; }
    public ICollection<PlayerRating> RatingsReceived { get; set; }
    public ICollection<PlayerGoal> Goals { get; set; }
}
}