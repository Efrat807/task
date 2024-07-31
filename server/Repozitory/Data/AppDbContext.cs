using Microsoft.EntityFrameworkCore;
using Repozitory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repozitory.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        //public DbSet<Product> Products { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShoppingList>(entity =>
            {
                entity.ToTable("ShoppingLists");
                entity.OwnsMany(s => s.Products, ownedNavigationBuilder =>
                {
                    ownedNavigationBuilder.ToJson();
                });
            });

        }
    }
}
