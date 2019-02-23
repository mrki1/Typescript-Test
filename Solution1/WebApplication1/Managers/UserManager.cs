using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WebApplication1.Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace WebApplication1.Managers
{
    public class UserManager : IUserManager
    {

        private readonly IConfiguration _config;

        public UserManager(IConfiguration config)
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


        public async Task<IList<TreevItem>> GetTreeviewData()
        {

            List<TreevItem> retList = new List<TreevItem>();

            using (IDbConnection conn = Connection)
            {

                string stmt = @"select UsersVW.CountryName, UsersVW.CityName, UsersVW.DepartmentName" +
                    ", COUNT(UsersVW.CountryName) OVER(PARTITION BY UsersVW.CountryName) AS[CountryName_count]" +
                    ", COUNT(UsersVW.CityName) OVER(PARTITION BY UsersVW.CountryName, UsersVW.CityName) AS[CityName_count]" +
                    ", COUNT(UsersVW.DepartmentName) OVER(PARTITION BY UsersVW.CountryName, UsersVW.CityName, UsersVW.DepartmentName) AS[DepartmentName_count] " +
                    "from UsersVW";

                conn.Open();
                dynamic results = await conn.QueryAsync<dynamic>(stmt);

                int deep = 0;
                TreevItem fvMain;
                string count, val, text1;
                string[] grouping = new string[3] { "CountryName", "CityName", "DepartmentName" };
                bool shouldReturnCount = true;
                int i = 1;

                foreach (var result in results)
                {
                    TreevItem mainStructure = null;
                    TreevItem nextChild = null;
                    deep = 0;

                    foreach (var group in grouping)
                    {

                        var data = (IDictionary<string, object>)result;

                        count = data[$"{group}_count"].ToString();
                        val = data[@group] as string;

                        //count = ((object)result).GetType().GetProperty($"{group}_count").GetValue(result, null) as string;
                        //val = ((object)result).GetType().GetProperty(@group).GetValue(result, null) as string;

                        text1 = val;
                        if (shouldReturnCount) text1 = $"{val} ({count})";

                        var values = new TreevItem
                        {
                            text = text1,
                            value = i
                        };

                        i++;
                        //if (shouldReturnCount)
                        //values.count = result.GetType().GetProperty($"{group}_count").GetValue(result, null);

                        if (deep == 0)
                        {
                            fvMain =
                                retList.Find(
                                    delegate (TreevItem x) { return x.text.Equals(values.text); });

                            if (fvMain == null)
                            {
                                mainStructure = PopulateMainStucture(mainStructure, values);
                                nextChild = mainStructure;
                                retList.Add(mainStructure);
                            }
                            else
                            {
                                //if (shouldReturnCount) fvMain.count = values.count;
                                nextChild = fvMain;
                                mainStructure = fvMain;
                            }
                        }
                        else
                        {
                            nextChild = PopulateChild(nextChild, values, shouldReturnCount);
                        }
                        deep++;
                    }
                }
            }

            return retList;
        }

        private static TreevItem PopulateMainStucture(TreevItem parent, TreevItem values)
        {
            if (parent == null)
            {
                parent = new TreevItem
                {
                    text = values.text,
                    value = values.value
                };
            }

            return parent;
        }

        private static TreevItem PopulateChild(TreevItem parent, TreevItem values,
            bool shouldReturnCount = false)
        {

            TreevItem nextChild = null;


            if (parent.children == null)
                parent.children = new List<TreevItem>();

            TreevItem child = new TreevItem
            {
                text = values.text,
                value = values.value
            };

            TreevItem fv = parent.children.Find(delegate (TreevItem x) { return x.text.Equals(child.text); });

            if (fv == null)
            {
                parent.children.Add(child);
                nextChild = child;
            }
            else
            {
                //if (shouldReturnCount) fv.count = values.count;
                nextChild = fv;
            }

            return nextChild;
        }

        private string getChildSql(TreeviewItem[] children, int deep, string[] grouping)
        {

            deep++;

            TreeviewItem item = null;

            string field;

            string sql = "";

            for (int i = 0; i < children.Length; i++)
            {

                field = grouping[deep];

                item = children[i];

                if (!sql.Equals(""))
                {
                    sql = sql + " or ";
                }

                sql = sql + "(";

                sql = sql + field + " = '" + item.text.Substring(0, item.text.IndexOf("(") - 1) + "'";

                if (item.internalChildren != null)
                {
                    sql = sql + " and " + getChildSql(item.internalChildren, deep, grouping);
                }

                sql = sql + ")";
            }

            return sql;
        }

        public async Task<dynamic> GetSelectedData(TreeviewItem[] searchItm)
        {

            dynamic results = null;
            TreeviewItem item = null;

            string[] grouping = new string[3] { "CountryName", "CityName", "DepartmentName" };
            int deep = 0;
            string field;

            string stmt = $"select UsersVW.CountryName, UsersVW.CityName, UsersVW.DepartmentName, Hours.* from UsersVW" +
                $" INNER JOIN Hours ON UsersVW.EmployeeId = Hours.EmployeeId";

            string sql = "";

            for (int i = 0; i < searchItm.Length; i++)
            {

                field = grouping[deep];

                item = searchItm[i];

                if (!sql.Equals("")) {
                    sql = sql + " or ";
                }

                sql = sql + "(";

                sql = sql + field + " = '" + item.text.Substring(0, item.text.IndexOf("(") - 1) + "'";

                if (item.internalChildren != null)
                {
                    sql = sql + " and " + getChildSql(item.internalChildren, deep, grouping);
                }

                sql = sql + ")";
            }

            if (!sql.Equals(""))
            {
                stmt = stmt + " where " + sql;
            }


            using (IDbConnection conn = Connection)
            {
                conn.Open();
                results = await conn.QueryAsync<dynamic>(stmt);
            }

            return results;
        }
    }
}
