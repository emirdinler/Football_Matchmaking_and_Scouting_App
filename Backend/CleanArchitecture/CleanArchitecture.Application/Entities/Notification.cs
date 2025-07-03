using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class Notification : BaseEntity
{
    public int UserId { get; set; }
    public string Type { get; set; }
    public string Content { get; set; }
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public User User { get; set; }
}
}