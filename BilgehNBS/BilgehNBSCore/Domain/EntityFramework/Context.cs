using System;
using System.Collections.Generic;
using System.Text;

using BilgehNBSCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BilgehNBSCore.Domain.EntityFramework
{
    public class Context : DbContext
    {
        public DbSet<IdCardInformation> IdCardInformations { get; set; }
        public DbSet<Crossing> Crossings { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<PersonWithType> PersonWithTypes { get; set; }
        public DbSet<RelativeType> RelativeTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<PersonType> PersonTypes { get; set; }
        public DbSet<Worker> Worker { get; set; }
        public DbSet<WorkerParent> WorkerParent { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            dbContextOptionsBuilder.UseNpgsql("Server=localhost;port=5432;Database=BilgehNBS;User Id=postgres;password=12345");
        }
    }
}
