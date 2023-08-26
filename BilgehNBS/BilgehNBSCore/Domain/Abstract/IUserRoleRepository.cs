using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Abstract
{
    public interface IUserRoleRepository : IRepository<UserRole>
    {
        IList<UserRole> GetByUserId(int userId);

        IList<UserRole> GetByRoleId(int roleId);
    }
}
