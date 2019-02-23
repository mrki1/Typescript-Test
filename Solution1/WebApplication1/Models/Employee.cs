using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public partial class Employee
    {
        public int EmployeeId { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public string EmployeeFullName { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
        public int DepartmentId { get; set; }

        public City City { get; set; }
        public Country Country { get; set; }
        public Department Department { get; set; }
    }
}
