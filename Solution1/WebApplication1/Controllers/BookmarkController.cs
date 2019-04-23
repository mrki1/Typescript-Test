using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;
using Microsoft.Extensions.Configuration;
using WebApplication1.Managers;

namespace WebApplication1.Controllers
{

    [Route("api/[controller]")]
    public class BookmarkController : Controller
    {

        private readonly IBookmarkManager _bookManager;

        public BookmarkController(IBookmarkManager um)
        {
            _bookManager = um;
        }

        [HttpGet("[action]")]
        public async Task<IList<Bookmark>> GetAllBookmarks()
        {
            return await _bookManager.GetAllBookmarks();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateBookmark([FromBody]Bookmark bookmark)
        {
            return await _bookManager.CreateBookmark(bookmark);
        }
    }
}