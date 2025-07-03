using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class Team : BaseEntity
{
    public string Name { get; set; }
    public string Location { get; set; }
    public int? CaptainId { get; set; }
    public string TeamLogoUrl { get; set; }

    public User Captain { get; set; }
    public ICollection<TeamPlayer> TeamPlayers { get; set; }
}
}