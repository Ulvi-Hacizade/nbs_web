using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace BilgehNBSCore.DataAccess.PostgreSqlServer
{
    public class PostgreSqlUnitOfWork : IUnitOfWork
    {
        private readonly Context context;
        
        public PostgreSqlUnitOfWork(Context context)
        {
            
            this.context = context;
        }

        
        public IUserRepository UserRepository => new PostgreSqlUserRepository(context);

        public IRoleRepository RoleRepository => new PostgreSqlRoleRepository(context);

        public IUserRoleRepository UserRoleRepository =>new PostgreSqlUserRoleRepository(context);


        public ICrossingRepository CrossingRepository => new PostgreSqlCrossingRepository(context);

        public IPersonWithTypeRepository PersonWithTypeRepository =>  new PostgreSqlPersonWithTypeRepository(context);

        public IRelativeTypeRepository RelativeTypeRepository => throw new NotImplementedException();

        public IEmployeeRepository EmployeeRepository => new PostgreSqlEmployeeRepository(context);

        public IPersonTypeRepository PersonTypeRepository =>  new PostgreSqlPersonTypeRepository(context);

        public IIdCardInformationRepository IdCardInformationRepository =>  new PostgreIdCardInformationRepository(context);

        public IFamilyRepository FamilyRepository => new PostgreSqlFamilyRepository(context);

        public IGuestRepository GuestRepository => new PostgreSqlGuestRepository(context);

        public IWorkerParentRepository WorkerParentRepository => new PostgreSqlWorkerParentRepository(context);

        public IWorkerRepository WorkerRepository => new PostgreSqlWorkerRepository(context);

        public bool CheckServer()
        {
            return true;
        }

        public void Dispose()
        {
            //output hissesine diqqetele bax))
            //throw new NotImplementedException();
        }
    }
}
