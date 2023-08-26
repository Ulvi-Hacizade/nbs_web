using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Abstract
{
   
        public interface IDataResult<out T> : IResult
        {
            public T Data { get; }
        }
    
}
