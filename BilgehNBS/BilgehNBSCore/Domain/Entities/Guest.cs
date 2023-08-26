using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
   public class Guest:BaseEntity
    {

        public int Id { get; set; }
        public IdCardInformation IdCardInformation { get; set; }


        public PersonWithType PersonWithType { get; set; }

        public bool EventParticipants { get; set; }
        public Employee Employee { get; set; }
    }
}
