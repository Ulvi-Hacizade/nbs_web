using AutoMapper;
using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Profiles
{
    public class PersonWithTypeProfile:Profile
    {
        public PersonWithTypeProfile()
        {
           //reateMap<PersonWithType, PWTEmployeeFamilyModel>().ForMember(o=>o.Id, b=>b.MapFrom(z=>z.Id)=>!string.IsNullOrEmpty)''
                //ReverseMap();
            //CreateMap<IdCardInformation, IdCardInformationModel>();
        }
    }
}
