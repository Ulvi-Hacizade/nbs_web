using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Factories
{
   public class Person
    {
        public string NameAz { get; set; }
        public string SurnameAz { get; set; }
        public string BirthDate { get; set; }
        public string PatronymicAz { get; set; }
        public string Height { get; set; }
        public string PIN { get; set; }
        public BirthAddress BirthAddress { get; set; }
        public BloodType BloodType { get; set; }
        public Gender Gender { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public EyeColor EyeColor { get; set; }
        public IAMASAddress IAMASAddress { get; set; }
        public Citizenship Citizenship { get; set; }
        public List<Images> Images { get; set; }
    }
}
