using BilgehNBSCore.DataAccess.PostgreSqlServer;
using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Factories
{
    public static class UnitOfWorkFactory
    {
        public static IUnitOfWork Create(Context context)
        {
            
            return new PostgreSqlUnitOfWork(context);
        }
    }
}
