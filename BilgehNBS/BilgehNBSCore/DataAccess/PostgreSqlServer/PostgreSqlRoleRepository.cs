using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlRoleRepository : PostgreSqlBaseRepository, IRoleRepository
    {

        public PostgreSqlRoleRepository(Context DbContext) : base(DbContext)
        {
            DbContext.Roles.ToList();
        }
       
        public int Add(Role obj)
        {
            DbContext.Roles.Add(obj);
            return 1;
        }

        public int AddList(List<Role> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {

            Role role = DbContext.Roles.Find(id);
            DbContext.Roles.Remove(role);

            return true;
        }

        public Role FindById(int id)
        {
            Role role = DbContext.Roles.Find(id);
            return role;
        }

        public List<Role> Get()
        {
            return DbContext.Roles.ToList();
        }

        public Role GetByRolename(string rolename)
        {
            return DbContext.Roles
                     .Where(s => s.RoleName == rolename)
                     .FirstOrDefault<Role>();

        }

        public bool Update(Role obj)
        {
            DbContext.Roles.Update(obj);
            return true;
        }
    }
}
