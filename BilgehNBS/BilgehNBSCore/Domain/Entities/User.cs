using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class User:BaseEntity
    {
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public User Creator { get; set; }

    }
}
