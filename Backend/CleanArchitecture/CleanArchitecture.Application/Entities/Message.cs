using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities {
public class Message : BaseEntity
{
    public int ChatId { get; set; }
    public int SenderUserId { get; set; }
    public string MessageText { get; set; }
    public DateTime SentAt { get; set; } = DateTime.UtcNow;

    public Chat Chat { get; set; }
    public User SenderUser { get; set; }
}
}