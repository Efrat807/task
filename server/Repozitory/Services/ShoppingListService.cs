using Microsoft.EntityFrameworkCore;
using Repozitory.Data;
using Repozitory.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repozitory.Services
{
    public class ShoppingListService
    {
        private readonly AppDbContext _context;

        public ShoppingListService(AppDbContext context)
        {
            _context = context;
        }

        // Create
        public async Task<ShoppingList> CreateAsync(ShoppingList shoppingList)
        {
            _context.ShoppingLists.Add(shoppingList);
            await _context.SaveChangesAsync();
            return shoppingList;
        }

        // Read (Get All)
        public async Task<List<ShoppingList>> GetAllAsync()
        {
            return await _context.ShoppingLists.ToListAsync();
        }

        // Read (Get By Id)
        public async Task<ShoppingList> GetByIdAsync(int id)
        {
            return await _context.ShoppingLists.FindAsync(id);
        }

        // Update
        public async Task<ShoppingList> UpdateAsync(ShoppingList shoppingList)
        {
            _context.Entry(shoppingList).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return shoppingList;
        }

        // Delete
        public async Task DeleteAsync(int id)
        {
            var shoppingList = await _context.ShoppingLists.FindAsync(id);
            if (shoppingList != null)
            {
                _context.ShoppingLists.Remove(shoppingList);
                await _context.SaveChangesAsync();
            }
        }
    }
}
