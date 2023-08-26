using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class Employee : BaseEntity
    {
       

        
       

       // public bool IsDriver { get; set; } = new bool();
        public bool IsAttended { get; set; }
        public IdCardInformation IdCardInformation { get; set; }

        public List<Family> FamilyList { get; set; }
        public List<Guest> GuestList { get; set; }

        public PersonWithType PersonWithType { get; set; }
        public int ChildCount { get; set; }
       
        public bool IsGuestInviter { get; set; }
        public bool IsReception { get; set; }
        public string Note { get;set; }
        // public string Note { get; set; }
    }
}
