using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Managers
{
    public interface IBookmarkManager
    {
        Task<IList<Bookmark>> GetAllBookmarks();
        Task<IActionResult> CreateBookmark([FromBody]Bookmark bookmark);
        Task<IActionResult> DeleteBookmark([FromBody]Bookmark bookmark);
        Task<IActionResult> UpdateBookmark([FromBody]Bookmark bookmark);
    }
}
