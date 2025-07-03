using CleanArchitecture.Core.Entities;
using Microsoft.EntityFrameworkCore;
using CleanArchitecture.Infrastructure.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace CleanArchitecture.Infrastructure.Contexts;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<TeamPlayer> TeamPlayers { get; set; }
    public DbSet<Match> Matches { get; set; }
    public DbSet<MatchRequest> MatchRequests { get; set; }
    public DbSet<PlayerRating> PlayerRatings { get; set; }
    public DbSet<PlayerGoal> PlayerGoals { get; set; }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Team>()
            .HasOne(t => t.Captain)
            .WithMany()
            .HasForeignKey(t => t.CaptainId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Player>()
            .HasOne(p => p.User)
            .WithMany(u => u.Players)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TeamPlayer>()
            .HasOne(tp => tp.Team)
            .WithMany(t => t.TeamPlayers)
            .HasForeignKey(tp => tp.TeamId);

        modelBuilder.Entity<TeamPlayer>()
            .HasOne(tp => tp.Player)
            .WithMany(p => p.TeamPlayers)
            .HasForeignKey(tp => tp.PlayerId);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.Team1)
            .WithMany()
            .HasForeignKey(m => m.Team1Id)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Match>()
            .HasOne(m => m.Team2)
            .WithMany()
            .HasForeignKey(m => m.Team2Id)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<PlayerRating>()
            .HasOne(pr => pr.Match)
            .WithMany(m => m.PlayerRatings)
            .HasForeignKey(pr => pr.MatchId);

        modelBuilder.Entity<PlayerRating>()
            .HasOne(pr => pr.RatedPlayer)
            .WithMany(p => p.RatingsReceived)
            .HasForeignKey(pr => pr.RatedPlayerId);

        modelBuilder.Entity<PlayerRating>()
            .HasOne(pr => pr.RaterUser)
            .WithMany(u => u.RatingsGiven)
            .HasForeignKey(pr => pr.RaterUserId);

        modelBuilder.Entity<PlayerGoal>()
            .HasOne(pg => pg.Match)
            .WithMany(m => m.PlayerGoals)
            .HasForeignKey(pg => pg.MatchId);

        modelBuilder.Entity<PlayerGoal>()
            .HasOne(pg => pg.Player)
            .WithMany(p => p.Goals)
            .HasForeignKey(pg => pg.ScorerPlayerId);

        modelBuilder.Entity<Chat>()
            .HasOne(c => c.Team1)
            .WithMany()
            .HasForeignKey(c => c.Team1Id);

        modelBuilder.Entity<Chat>()
            .HasOne(c => c.Team2)
            .WithMany()
            .HasForeignKey(c => c.Team2Id);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Chat)
            .WithMany(c => c.Messages)
            .HasForeignKey(m => m.ChatId);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.SenderUser)
            .WithMany(u => u.MessagesSent)
            .HasForeignKey(m => m.SenderUserId);

        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId);
    }
}
