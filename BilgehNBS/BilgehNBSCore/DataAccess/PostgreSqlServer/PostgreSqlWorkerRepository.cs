using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlWorkerRepository : PostgreSqlBaseRepository, IWorkerRepository
    {
        public PostgreSqlWorkerRepository(Context DbContext) : base(DbContext)
        {
            DbContext.WorkerParent.ToList();
        }
        public int Add(Worker obj)
        {
            throw new NotImplementedException();
        }

        public int AddList(List<Worker> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Worker FindById(int id)
        {

            var model = DbContext.Worker.Where(x => x.Id == id).Include(x => x.IdCardInformation).
                  Include(x => x.PersonWithType).ThenInclude(x => x.Crossing).ThenInclude(x => x.Creator).Include(x => x.WorkerParent).
                  ToList();

            return model[0];
        }

        public List<Worker> Get()
        {
            var model = DbContext.Worker.Include(x => x.IdCardInformation).
                  Include(x => x.PersonWithType).ThenInclude(x => x.Crossing).ThenInclude(x => x.Creator).Include(x=>x.WorkerParent).
                  ToList();
            return model;
        }

        public bool Update(Worker obj)
        {

            DbContext.Worker.Update(obj);
            DbContext.SaveChanges();
            return true;
        }
    }

       
    }

