using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class FamilyModel
    {

        public int Id { get; set; }

       // public DateTime CreationDate { get; set; }


        public string RelativeType { get; set; }
         public EmployeeModel Employee { get; set; }
        public IdCardInformationModel IdCardInformation { get; set; }

        public PWTModel PersonWithType { get; set; }
        public bool IsReception { get; set; }
    }
}
