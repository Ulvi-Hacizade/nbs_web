using BilgehNBSCore.Factories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BilgehNBSCore.Domain.Abstract
{
  public  interface IdCardInformationEndpointService
    {
        Task<IDataResult<IdCardDto>> IdCardByPinOrSeria(string pinOrSeria);
        Task<IdCardNSP> IdCardByNSP(string name, string surname, string patronymic);
        Task<string> GetPinAl(string tokenBase64);
    }
}
