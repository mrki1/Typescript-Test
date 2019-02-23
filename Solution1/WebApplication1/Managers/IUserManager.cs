using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Managers
{
    public interface IUserManager
    {
        Task<IList<TreevItem>> GetTreeviewData();

        Task<dynamic> GetSelectedData(TreeviewItem[] searchItm);
    }
}
