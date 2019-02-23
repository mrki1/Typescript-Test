using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models
{
    public class TreevItem
    {

        public string text { get; set; }

        public int value { get; set; }

        public List<TreevItem> children { get; set; }
    }

    public class TreeviewItem
    {

        public string text { get; set; }

        public int value { get; set; }

        public TreeviewItem[] internalChildren { get; set; }
    }

    public class UsersVW {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public string EmployeeFullName { get; set; }
   }

    public class UsersTreeVW
    {
        public string CountryName { get; set; }
        public string CityName { get; set; }
        public string DepartmentName { get; set; }
        public int CountryName_count { get; set; }
        public int CityName_count { get; set; }
        public int DepartmentName_count { get; set; }
    }
}
