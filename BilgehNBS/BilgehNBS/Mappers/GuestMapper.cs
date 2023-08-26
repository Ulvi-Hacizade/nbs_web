using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Mappers
{
    public class GuestMapper
    {
        public static GuestModel Map(Guest guest)
        {
            var model = new GuestModel();
            model.Id = guest.Id;
            model.EventParticipants = guest.EventParticipants;
            model.IdCardInformation = new IdCardInformationModel();
            model.IdCardInformation = IdCardInformationMapper.Map(guest.IdCardInformation);


            model.PersonWithType = new PWTModel();
            model.PersonWithType = PersonWithTypeMapper.Map(guest.PersonWithType);


            return model;

        }

        public static Guest Map(GuestModel model, Guest destination)
        {
            destination.Id = model.Id;
            destination.EventParticipants = model.EventParticipants;
            destination.IdCardInformation = new IdCardInformation();
            destination.IdCardInformation = IdCardInformationMapper.Map(model.IdCardInformation, destination.IdCardInformation);

            destination.PersonWithType = new PersonWithType();
            destination.PersonWithType = PersonWithTypeMapper.Map(model.PersonWithType, destination.PersonWithType);
           

                return destination;
            }
        }
    }

