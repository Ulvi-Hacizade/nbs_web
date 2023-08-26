using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class ModelforJson
    {
        //employee
        public int PersonType { get; set; }
        //public int IdEmFa { get; set; }
        public string ChildCount { get; set; }
        public DateTime CreationDate { get; set; }
        public bool EventParticipants { get; set; }
        public bool IsDriver { get; set; } = new bool();
        public bool IsAttended { get; set; }
        public string Note { get; set; }

        //id information
        public int IdCardId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string FatherName { get; set; }
        public string Patronymic { get; set; }
        public string PassportNumber { get; set; }
        public string BirthAddress { get; set; }
        public string BirthDate { get; set; }
        public string RegistrationAddress { get; set; }
        public string GivenOrganizatoin { get; set; }
        public string MaritalStatus { get; set; }
        public string BloodType { get; set; }
        public string Height { get; set; }
        public string EyeColor { get; set; }
        public string GivenDate { get; set; }
        public string ExpireDate { get; set; }
        public string Pin { get; set; }
        public string ActivationDate { get; set; }
        public string DeActivationReason { get; set; }
        public string Status { get; set; }
        public string Image { get; set; }
        public string Gender { get; set; }
        //crossing
        public int Id { get; set; }
        public DateTime CrossingTime { get; set; }

        //0 -output, 1-input
        public bool InputOrOutput { get; set; }

        //public PersonWithType PersonWithType { get; set; }

        public string CarNumber { get; set; }
        //family
        public string RelativeType { get; set; }
        public string RelativeTypeOther { get; set; }


    }
}
