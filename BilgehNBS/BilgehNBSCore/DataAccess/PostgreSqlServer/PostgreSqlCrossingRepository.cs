using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlCrossingRepository : PostgreSqlBaseRepository, ICrossingRepository
    {

        public PostgreSqlCrossingRepository(Context DbContext) : base(DbContext)
        {
            DbContext.IdCardInformations.ToList();
        }
        public int Add(Crossing obj)
        {
            DbContext.Crossings.Add(obj);
            DbContext.SaveChanges();
            return 1;
        }

        public int AddList(List<Crossing> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Crossing FindById(int id)
        {
            Crossing cros = DbContext.Crossings.Find(id);
            return cros;
        }

        public List<Crossing> Get()
        {
            return DbContext.Crossings.ToList();
        }

        public bool Update(Crossing obj)
        {
            throw new NotImplementedException();
        }
    }
}
