using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class Worker : BaseEntity
    {
        public IdCardInformation IdCardInformation { get; set; }
        public PersonWithType PersonWithType { get; set; }
        public WorkerParent WorkerParent { get; set; }
    }
}
