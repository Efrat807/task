﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repozitory.Models
{
    public class Category
    {
        public int Id { get; set; }
       // [Required]
        [MaxLength(100)]
        public string Name { get; set; }
    }
    
}
