using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Factories
{
    public static class Kernel
    {
        public static IUnitOfWork Db { get; set; }
        public static User AuthenticatedUser { get; set; }
    }
}
