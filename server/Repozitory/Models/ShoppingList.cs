using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repozitory.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public List<Product> Products { get; set; }
    }
}
