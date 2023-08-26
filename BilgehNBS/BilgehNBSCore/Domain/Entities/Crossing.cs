using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class Crossing : BaseEntity
    {
        public DateTime CrossingTime { get; set; }

        //0 -output, 1-input
        public bool? InputOrOutput { get; set; }
        public PersonWithType PersonWithType { get; set; }
        public string CarNumber{get;set;}
        public bool IsDriver { get; set; }
        public bool? Permanent { get; set; }
        public string Note { get; set; }
        public User Creator { get; set; }

    }
}
