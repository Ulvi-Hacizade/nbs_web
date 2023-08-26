using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Mappers
{

    public class FamilyMapper
    {
        public static FamilyModel Map(Family family)
        {
            var model = new FamilyModel();
            model.Id = family.Id;
            model.IdCardInformation = new IdCardInformationModel();
            model.IdCardInformation = IdCardInformationMapper.Map(family.IdCardInformation);
            model.IsReception = family.IsReception;
            model.RelativeType = family.Relativetype;

            model.PersonWithType = new PWTModel();
            model.PersonWithType = PersonWithTypeMapper.Map(family.PersonWithType);
           

           



            return model;

        }


        public static Family Map(FamilyModel model, Family destination)
        {
            destination.Id = model.Id;
            destination.IsReception = model.IsReception;
            destination.IdCardInformation = new IdCardInformation();
            destination.IdCardInformation = IdCardInformationMapper.Map(model.IdCardInformation, destination.IdCardInformation);

            destination.Relativetype = model.RelativeType;

            destination.PersonWithType = new PersonWithType();
            destination.PersonWithType = PersonWithTypeMapper.Map(model.PersonWithType, destination.PersonWithType);

            // destination.Employee = new Employee();
            //destination.Employee = EmployeeMapper.Map(model.Employee, destination.Employee);

            return destination;
        }
    }
}
