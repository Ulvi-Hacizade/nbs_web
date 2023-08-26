using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlUserRoleRepository : PostgreSqlBaseRepository, IUserRoleRepository
    {

        public PostgreSqlUserRoleRepository(Context DbContext) : base(DbContext)
        {
            DbContext.Roles.ToList();
        }
        public int Add(UserRole obj)
        {
            DbContext.UserRoles.Add(obj);
            return 1;
        }

        public int AddList(List<UserRole> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            UserRole userrole = DbContext.UserRoles.Find(id);
            DbContext.UserRoles.Remove(userrole);

            return true;
        }

        public UserRole FindById(int id)
        {
            UserRole userrole = DbContext.UserRoles.Find(id);
            return userrole;
        }

        public List<UserRole> Get()
        {
            return DbContext.UserRoles.ToList();
        }

        public IList<UserRole> GetByRoleId(int roleId)
        {
            Role role = DbContext.Roles.Find(roleId);



            IList<UserRole>listuserroles = DbContext.UserRoles.Where(r => r.Role==role).ToList();
            
            return listuserroles;
        }

        public IList<UserRole> GetByUserId(int userId)
        {
            
            
           IList<UserRole> listuserroles = DbContext.UserRoles.Where(x=>x.User.Id==userId ).ToList();
          // var roles = DbContext.Roles.Where(x => x. == listuserroles[0].Id).FirstOrDefault();

            return listuserroles;
        }

        public bool Update(UserRole obj)
        {
            DbContext.UserRoles.Update(obj);
            return true;
        }
    }
}
