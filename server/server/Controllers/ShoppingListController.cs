using Microsoft.AspNetCore.Mvc;
using Repozitory.Models;
using Repozitory.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListController:ControllerBase
    {
        private readonly ShoppingListService _shoppingListService;
        public ShoppingListController(ShoppingListService shoppingListService)
        {
            _shoppingListService=shoppingListService;
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingList>> CreateShoppingList(ShoppingList shoppingList)
        {
            try
            {
                await _shoppingListService.CreateAsync(shoppingList);  
                return Ok(shoppingList);
            }
            catch (Exception e)
            {
                return BadRequest($"creating shoppingList faild. {e}");
            }
        }
    }
}
