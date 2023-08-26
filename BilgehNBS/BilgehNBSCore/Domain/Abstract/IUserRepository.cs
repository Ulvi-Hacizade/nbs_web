using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Abstract
{
    public interface IUserRepository : IRepository<User>
    {
        User FindByUsername(string username);
    }
}
