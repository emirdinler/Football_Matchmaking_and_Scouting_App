using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class TeamPlayer : BaseEntity
{
    public int TeamId { get; set; }
    public int PlayerId { get; set; }
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;

    public Team Team { get; set; }
    public Player Player { get; set; }
}
}