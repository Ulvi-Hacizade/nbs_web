using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Mappers
{
    public class PersonWithTypeMapper
    {
        public static PWTModel Map(PersonWithType personWithType)
        {
            var model = new PWTModel();
            model.Id = personWithType.Id;
            model.PersonId = personWithType.PersonId;
            model.PersonTypeId = personWithType.PerssonTypeId;

            if (personWithType.Crossing != null)
            {
                model.Crossing = new List<CrossingModel>();
              foreach (var crossing in personWithType.Crossing)
                    
                {
                    CrossingModel crosmodel = new CrossingModel();
                    crosmodel = CrossingMapper.Map(crossing);

                    model.Crossing.Add(crosmodel);
                }
            }
            

            return model;

        }

        public static PersonWithType Map(PWTModel model, PersonWithType destination)
        {
            if (model.Id ==0)
            {
                destination.Id = model.Id;
            }

            destination.Crossing = new List<Crossing>();
            for(int i=0; i<model.Crossing.Count;i++)
            {
                Crossing cros = new Crossing();
                cros= CrossingMapper.Map(model.Crossing[i], cros);
                destination.Crossing.Add(cros);
            }

            destination.PerssonTypeId = model.PersonTypeId;

           
            

            return destination;
        }


    }
}
