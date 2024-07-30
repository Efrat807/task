using Microsoft.AspNetCore.Mvc;
using Repozitory.Models;
using Repozitory.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController: ControllerBase
    {
       private readonly CategoryService _categoryService;
        public CategoryController(CategoryService categoryService) 
        { 
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(categories);
        }
    }
}
