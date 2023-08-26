using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
       //public DateTime CreationDate { get; set; } = DateTime.Now;
       
       // public bool IsDeleted { get; set; }
    }
}
