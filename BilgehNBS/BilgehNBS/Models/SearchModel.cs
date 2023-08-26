using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class SearchModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Fathername { get; set; }
        public string CarNumber { get; set; }
        public DateTime FromDatetime { get; set; } = DateTime.Now;
        public DateTime TillDatatime { get; set; } = DateTime.Now;
        public string Persontype1 { get; set; }
        public string Persontype2 { get; set; }
        public string Persontype3 { get; set; }
        public string Persontype4 { get; set; }
        public string Persontype5 { get; set; }
        public List<EmployeeModel> EmployeeList = new List<EmployeeModel>();
        public List<EmployeeModel> EmployeeListReception = new List<EmployeeModel>();
        public List<FamilyModel> FamilyList = new List<FamilyModel>();
        public List<GuestModel> GuestList = new List<GuestModel>();
        public List<WorkerModel> WorkerList = new List<WorkerModel>();

    }
}
