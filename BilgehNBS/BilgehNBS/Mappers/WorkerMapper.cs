using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Mappers
{
    public class WorkerMapper
    {
        public static WorkerModel Map(Worker worker)
        {
            var model = new WorkerModel();
            model.Id = worker.Id;
            model.IdCardInformation = new IdCardInformationModel();
            model.IdCardInformation = IdCardInformationMapper.Map(worker.IdCardInformation);

            //model.WorkerParentModel = new WorkerParentModel();
            //model.WorkerParentModel = WorkerParentMapper.Map(worker.WorkerParent);
           
            

            model.PersonWithtype = new PWTModel();
            model.PersonWithtype = PersonWithTypeMapper.Map(worker.PersonWithType);

         



            return model;

        }

        public static Worker Map(WorkerModel model, Worker destination)
        {
            destination.Id = model.Id;
           
            destination.IdCardInformation = new IdCardInformation();
            destination.IdCardInformation = IdCardInformationMapper.Map(model.IdCardInformation, destination.IdCardInformation);

            destination.PersonWithType = new PersonWithType();
            destination.PersonWithType = PersonWithTypeMapper.Map(model.PersonWithtype, destination.PersonWithType);

           

            return destination;
        }
    }
}
