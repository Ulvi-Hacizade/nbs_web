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
    public class PostgreSqlGuestRepository : PostgreSqlBaseRepository, IGuestRepository
    {
        public PostgreSqlGuestRepository(Context DbContext) : base(DbContext)
        {
            DbContext.Employees.ToList();
        }

        public int Add(Guest obj)
        {
            throw new NotImplementedException();
        }

        public int AddList(List<Guest> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Guest FindById(int id)
        {
            throw new NotImplementedException();
        }

        public List<Guest> Get()
        {
            var model = DbContext.Guests.Include(x => x.IdCardInformation)
                 .Include(x => x.Employee).ThenInclude(x => x.IdCardInformation)

                 .Include(x => x.PersonWithType).ThenInclude(x => x.Crossing).ThenInclude(x => x.Creator)

                 .ToList();
            return model;
        }

        public bool Update(Guest obj)
        {
            throw new NotImplementedException();
        }
    }
}
