using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class GuestModel
    {
        public int Id { get; set; }
        public IdCardInformationModel IdCardInformation { get; set; }


        public PWTModel PersonWithType { get; set; }

        public bool EventParticipants { get; set; }
        public EmployeeModel Employee { get; set; }

    }
}
