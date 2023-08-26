using BilgehNBSCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Abstract
{
    public interface IRepository<T> where T : BaseEntity
    {
        int Add(T obj);
        int AddList(List<T> obj);
        bool Update(T obj);
        bool Delete(int id);
        T FindById(int id);
        List<T> Get();
    }
}
