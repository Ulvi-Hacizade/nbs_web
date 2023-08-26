using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlPersonTypeRepository : PostgreSqlBaseRepository, IPersonTypeRepository
    {

        public PostgreSqlPersonTypeRepository(Context DbContext) : base(DbContext)
        {
            DbContext.Employees.ToList();
        }

        public int Add(PersonType obj)
        {
            throw new NotImplementedException();
        }

        public int AddList(List<PersonType> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public PersonType FindById(int id)
        {
            PersonType personType = DbContext.PersonTypes.Find(id);
            return personType;
        }

        public List<PersonType> Get()
        {
           
               return DbContext.PersonTypes.ToList();
           
        }

        public bool Update(PersonType obj)
        {
            throw new NotImplementedException();
        }
    }
}
