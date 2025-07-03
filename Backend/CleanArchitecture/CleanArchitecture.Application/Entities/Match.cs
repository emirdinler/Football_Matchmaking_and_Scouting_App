using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class Match : BaseEntity
{
    public int? Team1Id { get; set; }
    public int? Team2Id { get; set; }
    public string Location { get; set; }
    public DateTime MatchDate { get; set; }
    public string Status { get; set; }
    public int? ScoreTeam1 { get; set; }
    public int? ScoreTeam2 { get; set; }

    public Team Team1 { get; set; }
    public Team Team2 { get; set; }
    public ICollection<PlayerRating> PlayerRatings { get; set; }
    public ICollection<PlayerGoal> PlayerGoals { get; set; }
}
}