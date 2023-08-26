using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class WorkerParentModel
    {
        public int Id { get; set; }

        public List<WorkerModel> WorkerModelList { get; set; }
        public string Note { get; set; }
    }
}
