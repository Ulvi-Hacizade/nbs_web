using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class WorkerParent:BaseEntity
    {
        public List<Worker> WorkerList { get; set; }
        public string Note { get; set; }
    }
}
