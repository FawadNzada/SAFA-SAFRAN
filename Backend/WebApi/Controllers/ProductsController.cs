using Core.Contracts;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

using Persistence;

using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    /// <summary>
    /// Controller für alle Produkte
    /// </summary>
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Konstruktor des Controllers
        /// </summary>
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Liefert alle Produkte
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }
    }
}