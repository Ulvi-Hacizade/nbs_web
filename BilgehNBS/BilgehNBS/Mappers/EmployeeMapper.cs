using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Mappers
{
    public class EmployeeMapper
    {
        public static EmployeeModel Map(Employee employee)
        {
            var model = new EmployeeModel();
            model.Id = employee.Id;
            model.IdCardInformation = new IdCardInformationModel();
            model.IdCardInformation = IdCardInformationMapper.Map(employee.IdCardInformation);
            model.IsReception = employee.IsReception;

            if (employee.FamilyList != null)
            {
                model.Family = new List<FamilyModel>();
                foreach (var family in employee.FamilyList)
                {
                    FamilyModel fammilymodel = new FamilyModel();
                    fammilymodel = FamilyMapper.Map(family);
                    model.Family.Add(fammilymodel);
                }
            }


            if (employee.GuestList != null)
            {
                model.GuestList = new List<GuestModel>();
                foreach (var guest in employee.GuestList)
                {
                    GuestModel guestModel = new GuestModel();
                    guestModel = GuestMapper.Map(guest);
                    model.GuestList.Add(guestModel);
                }
            }
            model.IsAttended = employee.IsAttended;
            model.Note = employee.Note;

            model.PersonWithtype = new PWTModel();
            model.PersonWithtype = PersonWithTypeMapper.Map(employee.PersonWithType);

            model.ChildCount = employee.ChildCount;



            return model;

        }

        public static Employee Map(EmployeeModel model, Employee destination)
        {
            destination.Id = model.Id;
            destination.IsReception = model.IsReception;
            destination.IdCardInformation = new IdCardInformation();
            destination.IdCardInformation = IdCardInformationMapper.Map(model.IdCardInformation, destination.IdCardInformation);

            destination.PersonWithType = new PersonWithType();
            destination.PersonWithType = PersonWithTypeMapper.Map(model.PersonWithtype, destination.PersonWithType);

            destination.IsAttended = model.IsAttended;
            destination.IsGuestInviter = model.IsGuestInviter;
            destination.Note = model.Note;

            if (model.Family != null)
            {
                destination.FamilyList = new List<Family>();
                foreach (var family in model.Family)
                {
                    Family familyEntity = new Family();
                    familyEntity = FamilyMapper.Map(family, familyEntity);
                    destination.FamilyList.Add(familyEntity);
                }


            }


            if (model.GuestList != null)
            {
                destination.GuestList = new List<Guest>();
                foreach (var guest in model.GuestList)
                {
                    Guest guestEntity = new Guest();
                    guestEntity = GuestMapper.Map(guest, guestEntity);
                    destination.GuestList.Add(guestEntity);
                }
            }
            //destination.CreationDate = model.CreationDate;

            destination.ChildCount = model.ChildCount;

            return destination;
        }
    }
}