using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class UserRole : BaseEntity
    {

        // public int UserId { get; set; }
        // public int RoleId { get; set; }
        public User User { get; set; }
        public Role Role { get; set; }
        public User Creator { get; set; }
        

    }
}
