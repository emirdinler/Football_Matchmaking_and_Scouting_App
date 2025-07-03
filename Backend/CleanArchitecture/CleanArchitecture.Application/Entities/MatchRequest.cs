using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class MatchRequest : BaseEntity
{
    public int FromTeamId { get; set; }
    public int ToTeamId { get; set; }
    public DateTime ProposedDate { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Team FromTeam { get; set; }
    public Team ToTeam { get; set; }
}
}