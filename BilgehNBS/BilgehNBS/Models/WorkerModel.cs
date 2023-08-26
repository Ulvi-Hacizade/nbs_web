using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class WorkerModel
    {
        public int Id { get; set; }
        public IdCardInformationModel IdCardInformation { get; set; }
        public PWTModel PersonWithtype { get; set; }
        public WorkerParentModel WorkerParentModel { get; set; }
    }
}
