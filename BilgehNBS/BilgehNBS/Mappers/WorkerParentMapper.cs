using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Mappers
{
    public class WorkerParentMapper
    {
        public static WorkerParentModel Map(WorkerParent workerParent)
        {
            var model = new WorkerParentModel();
            model.Id = workerParent.Id;
            model.Note = workerParent.Note;

            ;
            if (workerParent.WorkerList != null)
            {
                model.WorkerModelList = new List<WorkerModel>();
                foreach (var worker in workerParent.WorkerList)
                {
                    WorkerModel workermodel = new WorkerModel();
                    workermodel = WorkerMapper.Map(worker);
                    model.WorkerModelList.Add(workermodel);
                }
            }


    

            return model;

        }

        public static WorkerParent Map(WorkerParentModel model, WorkerParent destination)
        {
            destination.Id = model.Id;
            
            destination.Note = model.Note;

            if (model.WorkerModelList != null)
            {
                destination.WorkerList = new List<Worker>();
                foreach (var worker in model.WorkerModelList)
                {
                    Worker workerEntity = new Worker();
                    workerEntity = WorkerMapper.Map(worker, workerEntity);
                    destination.WorkerList.Add(workerEntity);
                }


            }



            return destination;
        }
    }

    
}
