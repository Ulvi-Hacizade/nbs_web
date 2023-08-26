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
    public class PostgreSqlWorkerParentRepository : PostgreSqlBaseRepository, IWorkerParentRepository
    {
        public PostgreSqlWorkerParentRepository(Context DbContext) : base(DbContext)
        {
            DbContext.WorkerParent.ToList();
        }

        public int Add(WorkerParent obj)
        {
            DbContext.WorkerParent.Add(obj);
            DbContext.SaveChanges();
            return 1;
        }

        public int AddList(List<WorkerParent> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public WorkerParent FindById(int id)
        {
            var model = DbContext.WorkerParent.Where(x => x.Id == id)
                 .Include(x => x.WorkerList).ThenInclude(x => x.IdCardInformation).
                 Include(x => x.WorkerList).ThenInclude(x => x.PersonWithType).ThenInclude(x => x.Crossing).ToList();
            return model[0];
        }

        public List<WorkerParent> Get()
        {
            var model = DbContext.WorkerParent.Include(x => x.WorkerList).ThenInclude(x => x.IdCardInformation).
                  Include(x => x.WorkerList).ThenInclude(x => x.PersonWithType).ThenInclude(x => x.Crossing).ToList();
            return model;
        }

        public bool Update(WorkerParent obj)
        {

            DbContext.WorkerParent.Update(obj);
            DbContext.SaveChanges();
            return true;
        }
    }
}
