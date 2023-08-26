using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Mappers
{
    public class IdCardInformationMapper
    {
        public static IdCardInformationModel Map(IdCardInformation idCardInformation)
        {
            var model = new IdCardInformationModel();
            model.Id = idCardInformation.Id;
            model.Name = idCardInformation.Name;
            model.Surname = idCardInformation.Surname;
            model.FatherName = idCardInformation.FatherName;
            model.Patronymic = idCardInformation.Patronymic;
            model.PassportNumber = idCardInformation.PassportNumber;
            model.BirthAddress = idCardInformation.BirthAddress;
            model.BirthDate = idCardInformation.BirthDate;
            model.RegistrationAddress = idCardInformation.RegistrationAddress;
            model.GivenOrganizatoin = idCardInformation.GivenOrganizatoin;
            model.MaritalStatus = idCardInformation.MaritalStatus;
            model.BloodType = idCardInformation.BloodType;
            model.Height = idCardInformation.Height;
            model.EyeColor = idCardInformation.EyeColor;
            model.GivenDate = idCardInformation.GivenDate;
            model.ExpireDate = idCardInformation.ExpireDate;
            model.Pin = idCardInformation.Pin;
            model.ActivationDate = idCardInformation.ActivationDate;
            model.DeActivationReason = idCardInformation.DeActivationReason;
            model.Status = idCardInformation.Status;
            model.Gender = idCardInformation.Gender;
            model.Image = idCardInformation.Image;

            return model;
        }
        public static IdCardInformation Map(IdCardInformationModel model, IdCardInformation destination)
        {
            if (model.Id != 0)
            {
                destination.Id = model.Id;
            }

            if (model.Name != null)
            {
                destination.Name = model.Name;
            }

            if (model.Surname != null)
            {
                destination.Surname = model.Surname;
            }

            if (model.FatherName != null)
            {

                destination.FatherName = model.FatherName;
            }
            if (model.Patronymic != null)
            {
                destination.Patronymic = model.Patronymic;
            }

            if (model.PassportNumber != null)
            {
                destination.PassportNumber = model.PassportNumber;
            }

            if (model.BirthAddress != null)
            {
                destination.BirthAddress = model.BirthAddress;
            }

            if (model.BirthDate != null)
            {
                destination.BirthDate = model.BirthDate;
            }

            if (model.RegistrationAddress != null)
            {
                destination.RegistrationAddress = model.RegistrationAddress;
            }

            if (model.GivenOrganizatoin != null)
            {
                destination.GivenOrganizatoin = model.GivenOrganizatoin;
            }

            if (model.MaritalStatus != null)
            {
                destination.MaritalStatus = model.MaritalStatus;
            }

            if (model.BloodType != null)
            {
                destination.BloodType = model.BloodType;
            }

            if (model.Height != null)
            {
                destination.Height = model.Height;
            }

            if (model.EyeColor != null)
            {
                destination.EyeColor = model.EyeColor;
            }

            if (model.GivenDate != null)
            {
                destination.GivenDate = model.GivenDate;
            }

            if (model.ExpireDate != null)
            {
                destination.ExpireDate = model.ExpireDate;
            }

            if (model.Pin != null)
            {
                destination.Pin = model.Pin;
            }

            if (model.ActivationDate != null)
            {
                destination.ActivationDate = model.ActivationDate;
            }

            if (model.DeActivationReason != null)
            {
                destination.DeActivationReason = model.DeActivationReason;
            }

            if (model.Status != null)
            {
                destination.Status = model.Status;
            }

            if (model.Gender != null)
            {
                destination.Gender = model.Gender;
            }

            if (model.Image != null)
            {
                destination.Image = model.Image;
            }


            return destination;
        }
    }
}
