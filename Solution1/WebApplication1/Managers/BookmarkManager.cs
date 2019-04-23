using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WebApplication1.Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Managers
{
    public class BookmarkManager : IBookmarkManager
    {

        private readonly IConfiguration _config;

        public BookmarkManager(IConfiguration config)
        {
            _config = config;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("TestDB"));
            }
        }


        public async Task<IList<Bookmark>> GetAllBookmarks()
        {
            IList<Bookmark> lst = new List<Bookmark>();

            using (var context = new TestDBContext())
            {
                lst = await context.Bookmark.ToListAsync();
                context.SaveChanges();
            }

            return lst;
        }

        public async Task<IActionResult> CreateBookmark(Bookmark bookmark)
        {

            using (var context = new TestDBContext())
            {
                await context.Bookmark.AddAsync(bookmark);
                context.SaveChanges();
            }

            return new CreatedAtActionResult("Create", "Bookmark", null,new { value = bookmark.BookmarkId });
        }

        public async Task<IActionResult> DeleteBookmark(Bookmark bookmark)
        {

            using (var context = new TestDBContext())
            {
                context.Bookmark.Remove(bookmark);
                context.SaveChanges();
            }

            return new CreatedAtActionResult("Delete", "Bookmark", null, new { value = bookmark.BookmarkId });
        }

        public async Task<IActionResult> UpdateBookmark(Bookmark bookmark)
        {

            using (var context = new TestDBContext())
            {
                context.Bookmark.Update(bookmark);
                context.SaveChanges();
            }

            return new CreatedAtActionResult("Update", "Bookmark", null, new { value = bookmark.BookmarkId });
        }
    }
}
