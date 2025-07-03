using System;
using System.Collections.Generic;

namespace CleanArchitecture.Core.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public string ProfileImageUrl { get; set; }

        // Navigation properties
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Notification> Notifications { get; set; }
        public ICollection<Player> Players { get; set; }
        public ICollection<PlayerRating> RatingsGiven { get; set; }
    }
}
