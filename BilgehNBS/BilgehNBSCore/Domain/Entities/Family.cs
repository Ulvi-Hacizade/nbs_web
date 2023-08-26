using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class Family: BaseEntity
    {
        public string Relativetype { get; set; }
        public Employee Employee { get; set; }   
        public IdCardInformation IdCardInformation { get; set; }
        public PersonWithType PersonWithType { get; set; }
        public bool IsReception { get; set; }
    }
}
