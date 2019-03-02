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
    public class UserController : Controller
    {

        private readonly IUserManager _userManager;

        public UserController (IUserManager um)
        {
            _userManager = um;
        }

        [HttpGet("[action]")]
        public async Task<IList<TreevItem>> GetTreeviewData()
        {

            return await _userManager.GetTreeviewData();
        }

        [HttpPost("[action]")]
        public async Task<WorkingHours> GetSelectedData([FromBody] ChartInfo searchItm)
        {
            return await _userManager.GetSelectedData(searchItm);
        }
    }
}