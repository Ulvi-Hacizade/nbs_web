using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlPersonWithTypeRepository : PostgreSqlBaseRepository, IPersonWithTypeRepository
    {

        public PostgreSqlPersonWithTypeRepository(Context DbContext) : base(DbContext)
        {
            DbContext.PersonWithTypes.ToList();
        }

        public int Add(PersonWithType obj)
        {
            DbContext.PersonWithTypes.Add(obj);
            DbContext.SaveChanges();
            return 1;
        }

        public int AddList(List<PersonWithType >obj)
        {
            DbContext.PersonWithTypes.AddRange(obj);
            DbContext.SaveChanges();
            return 1;
        }

      

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public PersonWithType FindById(int id)
        {
            throw new NotImplementedException();
        }

        public List<PersonWithType> Get()
        {
            throw new NotImplementedException();
        }

        public bool Update(PersonWithType obj)
        {
            throw new NotImplementedException();
        }
    }
}