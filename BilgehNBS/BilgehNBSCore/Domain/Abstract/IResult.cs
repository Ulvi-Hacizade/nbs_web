using BilgehNBSCore.Utils;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Abstract
{
     
       
        public interface IResult
        {
            public ResultStatus ResultStatus { get; }
            public string Message { get; }
            public Exception Exception { get; }
        
    }
    
}
