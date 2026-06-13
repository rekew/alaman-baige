using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Core;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Horse> Horses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(user => user.PhoneNumber)
            .IsUnique()
            .HasDatabaseName("ix_users_phone_number_unique");

        modelBuilder.Entity<Horse>(entity =>
        {
            entity.Property(horse => horse.InsertedAt)
                .HasDefaultValueSql("NOW()");

            entity.Property(horse => horse.UpdatedAt)
                .HasDefaultValueSql("NOW()");

            entity.HasOne<User>()
                .WithMany()
                .HasForeignKey(user => user.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
