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
    public class PostgreSqlFamilyRepository : PostgreSqlBaseRepository, IFamilyRepository
    {
        public PostgreSqlFamilyRepository(Context DbContext) : base(DbContext)
        {
            DbContext.Employees.ToList();
        }

        public int Add(Family obj)
        {
            throw new NotImplementedException();
        }

        public int AddList(List<Family> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Family FindById(int id)
        {
            throw new NotImplementedException();
        }

        public List<Family> Get()
        {
            var model = DbContext.Families.Include(x => x.IdCardInformation)
                 .Include(x => x.Employee).ThenInclude(x => x.IdCardInformation)

                 .Include(x => x.PersonWithType).ThenInclude(x => x.Crossing).ThenInclude(x => x.Creator)

                 .ToList();
            return model;
        }

        public bool Update(Family obj)
        {
            throw new NotImplementedException();
        }
    }
}
