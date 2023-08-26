using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class IdCardInformation: BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string FatherName { get; set; }
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
        public DateTime CreateDate { get; set; }



    }
}
