using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BilgehNBSCore.Domain.Entities
{
    public class PersonWithType : BaseEntity
    {
      
        public int PerssonTypeId {get;set;}
        public List<Crossing>Crossing { get; set; }
        public int PersonId { get; set; }
      
       
        
       


    }
}
