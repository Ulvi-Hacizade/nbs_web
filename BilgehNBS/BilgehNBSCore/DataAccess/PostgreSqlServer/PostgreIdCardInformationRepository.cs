using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreIdCardInformationRepository : PostgreSqlBaseRepository, IIdCardInformationRepository
    {

        public PostgreIdCardInformationRepository(Context DbContext) : base(DbContext)
        {
            DbContext.IdCardInformations.ToList();
        }
        public int Add(IdCardInformation obj)
        {
            throw new NotImplementedException();
        }

        public int AddList(List<IdCardInformation> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IdCardInformation FindById(int id)
        {
            throw new NotImplementedException();
        }

        public List<IdCardInformation> Get()
        {
            throw new NotImplementedException();
        }

        public bool Update(IdCardInformation obj)
        {
            throw new NotImplementedException();
        }
    }
}
