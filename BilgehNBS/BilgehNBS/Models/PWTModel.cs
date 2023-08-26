using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class PWTModel
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public EmployeeModel Employee { get; set; }
        public List<CrossingModel> Crossing { get; set; }
        

        public int PersonTypeId { get; set; }

    }
}
