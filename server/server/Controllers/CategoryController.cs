using Microsoft.AspNetCore.Mvc;
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
    }
}
