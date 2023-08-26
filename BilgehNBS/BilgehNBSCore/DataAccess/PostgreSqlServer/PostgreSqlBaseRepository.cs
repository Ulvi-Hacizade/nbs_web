using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public abstract class PostgreSqlBaseRepository
    {
        protected Context DbContext { get; }

        public PostgreSqlBaseRepository(Context contextDb)
        {
            this.DbContext = contextDb;
        }
    }
}
