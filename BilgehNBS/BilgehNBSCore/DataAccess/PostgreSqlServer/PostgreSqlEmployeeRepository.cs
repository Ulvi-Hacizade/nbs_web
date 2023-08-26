using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlEmployeeRepository : PostgreSqlBaseRepository, IEmployeeRepository
    {
       

        public PostgreSqlEmployeeRepository(Context DbContext) : base(DbContext)
        {
            DbContext.Employees.ToList();
        }

        public int Add(Employee obj)
        {

           DbContext.Employees.Add(obj);
            DbContext.SaveChanges();
            return 1;

        }

        public int AddList(List<Employee> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Employee FindById(int id)
        {
            var model = DbContext.Employees.Where(x=>x.Id==id).Include(x => x.IdCardInformation)
                .Include(x => x.FamilyList).ThenInclude(x => x.IdCardInformation).
                Include(x => x.FamilyList).ThenInclude(x => x.PersonWithType).ThenInclude(x => x.Crossing)
                .Include(x => x.PersonWithType).ThenInclude(x => x.Crossing).ThenInclude(x => x.Creator)
                .Include(x => x.GuestList).ThenInclude(x => x.IdCardInformation).
                Include(x => x.GuestList).ThenInclude(x => x.PersonWithType).ThenInclude(x => x.Crossing).ToList();
            return model[0];
        }

        public List<Employee> Get()
        { 
            var model = DbContext.Employees.Include(x => x.IdCardInformation)
                .Include(x => x.FamilyList).ThenInclude(x=>x.IdCardInformation ).
                Include(x=>x.FamilyList).ThenInclude(x=>x.PersonWithType).ThenInclude(x=>x.Crossing)
                .Include(x=>x.PersonWithType).ThenInclude(x=>x.Crossing).ThenInclude(x=>x.Creator)
                .Include(x=>x.GuestList).ThenInclude(x=>x.IdCardInformation).
                Include(x=>x.GuestList).ThenInclude(x=>x.PersonWithType).ThenInclude(x=>x.Crossing).ToList();
            return model;
        }

        public bool Update(Employee obj)
        {

            DbContext.Employees.Update(obj);
            DbContext.SaveChanges();
            return true;
        }
    }
}
