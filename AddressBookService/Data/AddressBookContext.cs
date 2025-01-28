using Microsoft.EntityFrameworkCore;

public class AddressBookContext : DbContext
{
    public AddressBookContext(DbContextOptions<AddressBookContext> options)
        : base(options)
    {
    }

    public DbSet<AddressBookEntry> AddressBookEntries { get; set; }
    public DbSet<Job> Jobs { get; set; }
    public DbSet<Department> Departments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AddressBookEntry>()
            .HasOne(e => e.Job)
            .WithMany()
            .HasForeignKey(e => e.JobId);

        modelBuilder.Entity<AddressBookEntry>()
            .HasOne(e => e.Department)
            .WithMany()
            .HasForeignKey(e => e.DepartmentId);
    }
}
