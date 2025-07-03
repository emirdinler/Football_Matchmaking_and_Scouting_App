using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class Chat : BaseEntity
{
    public int Team1Id { get; set; }
    public int Team2Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Team Team1 { get; set; }
    public Team Team2 { get; set; }
    public ICollection<Message> Messages { get; set; }
}
}