using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class PlayerRating : BaseEntity
{
    public int MatchId { get; set; }
    public int RatedPlayerId { get; set; }
    public int RaterUserId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }

    public Match Match { get; set; }
    public Player RatedPlayer { get; set; }
    public User RaterUser { get; set; }
}
}