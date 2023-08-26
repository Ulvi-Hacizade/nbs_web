using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BilgehNBS.Identity
{
    public class UserStore : IUserStore<User>, IUserPasswordStore<User>, IUserRoleStore<User>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserStore(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Task AddToRoleAsync(User user, string roleName, CancellationToken cancellationToken)
        {
            var role = _unitOfWork.RoleRepository.GetByRolename(roleName);
            var accountRole = new UserRole
            {
                User = user,
                //CreationDate = user.CreationDate,
                Role = role,
                Creator = user.Creator,
                Id = user.Id,
                //IsDeleted = user.IsDeleted
                // RoleId = role.Id
            };
            _unitOfWork.UserRoleRepository.Add(accountRole);

            return Task.CompletedTask;
        }

        public Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
        {
            user.Id = _unitOfWork.UserRepository.Add(user);

            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
        {
            _unitOfWork.UserRepository.Delete(user.Id);

            return Task.FromResult(IdentityResult.Success);
        }

        public void Dispose()
        {

        }

        public Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            var account = _unitOfWork.UserRepository.FindById(int.Parse(userId));

            return Task.FromResult(account);
        }

        public Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            var account = _unitOfWork.UserRepository.FindByUsername(normalizedUserName);

            return Task.FromResult(account);
        }

        public Task<string> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username.ToUpperInvariant());
        }

        public Task<string> GetPasswordHashAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public Task<IList<string>> GetRolesAsync(User user, CancellationToken cancellationToken)
        {
            var roles = _unitOfWork.UserRoleRepository.GetByUserId(user.Id);
            var rolesList = roles.Select(x => x.Role.RoleName).ToList();

            return Task.FromResult(rolesList as IList<string>);
        }

        public Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Id.ToString());
        }

        public Task<string> GetUserNameAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username);
        }

        public Task<IList<User>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
        {
            //var users = _unitOfWork.UserRoleRepository.getb(roleName);

            //return Task.FromResult(users);
            IList<User> users1 = new List<User>();
            IList<User> users = users1;
            IList<Role> role1 = new List<Role>();
            IList<Role> rols = role1;
            return (Task<IList<User>>)users;
            //return Task.CompletedTask.;
        }

        public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(string.IsNullOrEmpty(user.PasswordHash) == false);
        }

        public Task<bool> IsInRoleAsync(User user, string roleName, CancellationToken cancellationToken)
        {
            int roleId = 2;
            if (BilgehNBSCore.Enums.UserType.Admin.ToString() == roleName) { roleId = 1; }
            else if ((BilgehNBSCore.Enums.UserType.User.ToString() == roleName)) { roleId = 2; }


            var users = _unitOfWork.UserRoleRepository.GetByRoleId(roleId);
            bool isInrole = users.Any(x => x.Id == user.Id);

            return Task.FromResult(isInrole);
        }

        public Task RemoveFromRoleAsync(User user, string roleName, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public Task SetNormalizedUserNameAsync(User user, string normalizedName, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public Task SetPasswordHashAsync(User user, string passwordHash, CancellationToken cancellationToken)
        {
            user.PasswordHash = passwordHash;

            return Task.CompletedTask;
        }

        public Task SetUserNameAsync(User user, string userName, CancellationToken cancellationToken)
        {
            user.Username = userName;

            return Task.CompletedTask;
        }

        public Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            _unitOfWork.UserRepository.Update(user);

            return Task.FromResult(IdentityResult.Success);
        }
    }
}
