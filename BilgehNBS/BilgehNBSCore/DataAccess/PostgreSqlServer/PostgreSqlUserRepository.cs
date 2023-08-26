using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlUserRepository : PostgreSqlBaseRepository, IUserRepository
    {
       

        public PostgreSqlUserRepository(Context DbContext) : base(DbContext)
        {

        }
        public int Add(User obj)
        {
            DbContext.Users.Add(obj);
            return 1;
        }

        public int AddList(List<User> obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
           User user= DbContext.Users.Find(id);
            DbContext.Users.Remove(user);

            return true;
        }

        public User FindById(int id)
        {
            User user = DbContext.Users.Find(id);
            return user;
        }

        public User FindByUsername(string username)
        {
            
            return DbContext.Users
                       .Where(s => s.Username == username)
                       .FirstOrDefault<User>();
            
        }

        public List<User> Get()
        {
           return DbContext.Users.ToList();
        }

        public bool Update(User obj)
        {
           DbContext.Users.Update(obj);
            return true;
        }
    }
}
