using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyMvcApp.Models;

namespace MyMvcApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        // This action method returns the "about_converted" view explicitly by name.
        public IActionResult About()
        {
            return View("About_converted");
        }

        public IActionResult Login()
        {
            return View("login_converted");
        }

        public IActionResult Signup()
        {
            return View("signup_converted");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = HttpContext.TraceIdentifier });
        }
    }
}
