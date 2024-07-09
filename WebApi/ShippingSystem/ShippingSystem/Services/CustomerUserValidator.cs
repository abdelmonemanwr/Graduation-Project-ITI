using Microsoft.AspNetCore.Identity;

namespace ShippingSystem.Services
{
    public class CustomUserValidator<TUser> : UserValidator<TUser> where TUser : class
    {
        public override async Task<IdentityResult> ValidateAsync(UserManager<TUser> manager, TUser user)
        {

            var result = await manager.UserValidators
              .OfType<UserValidator<TUser>>()
              .FirstOrDefault()
              ?.ValidateAsync(manager, user) ?? IdentityResult.Success;
            //var result = await base.ValidateAsync(manager, user);

            var errors = result.Errors.ToList();
            if (string.IsNullOrEmpty(await manager.GetUserNameAsync(user)))
            {
                errors.RemoveAll(e => e.Code == "InvalidUserName");
                //errors = errors.Where(e => e.Code != "InvalidUserName").ToList();

            }

            return errors.Any() ? IdentityResult.Failed(errors.ToArray()) : IdentityResult.Success;
        }
    }

}
