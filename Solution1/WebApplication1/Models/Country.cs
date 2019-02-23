using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public partial class Country
    {
        public Country()
        {
            Employee = new HashSet<Employee>();
        }

        public int CountryId { get; set; }
        public string CountryName { get; set; }

        public ICollection<Employee> Employee { get; set; }
    }
}
