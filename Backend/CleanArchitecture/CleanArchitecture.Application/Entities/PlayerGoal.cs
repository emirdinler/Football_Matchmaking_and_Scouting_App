using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class PlayerGoal : BaseEntity
{
    public int MatchId { get; set; }
    public int ScorerPlayerId { get; set; }
    public int? Minute { get; set; }

    public Match Match { get; set; }
    public Player Player { get; set; }
}
}