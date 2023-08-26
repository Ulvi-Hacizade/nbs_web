using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Models
{
    public class CrossingModel
    {
        public int Id { get; set; }
        public DateTime CrossingTime { get; set; }

        //0 -output, 1-input
        public bool? InputOrOutput { get; set; }
        public PWTModel PersonWithType { get; set; }
        public string CarNumber { get; set; }
        public bool IsDriver { get; set; } = new bool();
        public bool? Permanent { get; set; }
        public string Note { get; set; }
        public User Creator { get; set; }
    }
}
