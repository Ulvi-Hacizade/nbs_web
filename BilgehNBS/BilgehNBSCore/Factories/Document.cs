using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Factories
{
   public class Document
    {
        public string Seria { get; set; }
        public string Number { get; set; }
        public string ExpireDate { get; set; }
        public string GivenOrganization { get; set; }
        public string GivenDate { get; set; }
        public string Status { get; set; }
        public string ActivationDate { get; set; }
        public string DeactivationReason { get; set; }
    }
}
