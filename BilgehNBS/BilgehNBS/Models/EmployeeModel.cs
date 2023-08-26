using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class EmployeeModel
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; set; }
        public bool IsGuestInviter { get; set; }
        
        public bool IsAttended { get; set; }
        public IdCardInformationModel IdCardInformation { get; set; }
        //public User Creator { get; set; }
       
        public List<FamilyModel> Family { get; set; }
        public List<GuestModel> GuestList { get; set; }
        public PWTModel PersonWithtype { get; set; }
        public bool IsReception { get; set; }
        public int ChildCount { get; set; }
        public string Note { get; set; }
    }
}
