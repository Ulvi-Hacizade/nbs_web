using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Mappers
{
    public class CrossingMapper
    {
        public static CrossingModel Map(Crossing crossing)
        {
            var model = new CrossingModel();
            model.Id = crossing.Id;
            model.CarNumber = crossing.CarNumber;
            model.CrossingTime = crossing.CrossingTime;
            model.InputOrOutput = crossing.InputOrOutput;
            model.IsDriver = crossing.IsDriver;
            model.Permanent = crossing.Permanent;
            model.Note = crossing.Note;

           

            model.Creator = crossing.Creator;
            


            return model;

        }

        public static Crossing Map(CrossingModel model, Crossing destination)
        {
            destination.Id = model.Id;
            destination.CrossingTime = model.CrossingTime;
            destination.CarNumber = model.CarNumber;
            destination.InputOrOutput = model.InputOrOutput;
            destination.IsDriver = model.IsDriver;
            destination.Creator = model.Creator;
            destination.Permanent = model.Permanent;
            destination.Note = model.Note;

            return destination;
        }
    }
}
