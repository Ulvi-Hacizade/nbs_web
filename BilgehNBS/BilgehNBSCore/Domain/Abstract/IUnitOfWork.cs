using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.Domain.Abstract
{
    public interface IUnitOfWork : IDisposable
    {

        bool CheckServer();

        IUserRepository UserRepository { get; }
        IRoleRepository RoleRepository { get; }

        IUserRoleRepository UserRoleRepository { get; }
        ICrossingRepository CrossingRepository { get;}
        IPersonWithTypeRepository PersonWithTypeRepository { get; }
        IRelativeTypeRepository RelativeTypeRepository { get; }
        IEmployeeRepository EmployeeRepository { get; }
        IPersonTypeRepository PersonTypeRepository { get; }
        IIdCardInformationRepository IdCardInformationRepository { get; }
        IFamilyRepository FamilyRepository { get; }
        IGuestRepository GuestRepository { get; }
        IWorkerParentRepository WorkerParentRepository { get; }
        IWorkerRepository WorkerRepository { get; }




    }
}
