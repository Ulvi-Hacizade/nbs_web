 using BilgehNBS.Models.Account;
using BilgehNBSCore.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace BilgehNBS.Controllers
{
    [AllowAnonymous]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signinManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signinManager)
        {
            _userManager = userManager;
            _signinManager = signinManager;
        }

        [HttpGet]

        public IActionResult Login()
        {
            return View();
        }
      

        //private string CreatePasswordHash(User user, string password)
        //{
        //    var passwordHasher = new PasswordHasher<User>();
        //    return passwordHasher.HashPassword(user, password);
        //}

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {

            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Username);
                if (user == null)
                {
                    ModelState.AddModelError("LoginData", "Istifadəçi adı və ya şifrə yanlışdır");
                    return View(model);
                }
                //string hash = SecurityUtil.ComputeSha256Hash(model.Password);
                bool isOk = _userManager.CheckPasswordAsync(user, model.Password).Result;
                 //string has=CreatePasswordHash(user, model.Password);
                 
                //var signedUser = _userManager.FindByNameAsync(model.Username).Result;
                // var result = _signinManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true).Result;
                var result = await _signinManager.PasswordSignInAsync(user.Username, model.Password, model.RememberMe, true);

                if (!result.Succeeded)
                {
                    ModelState.AddModelError("LoginData", "Istifadəçi adı və ya şifrə yanlışdır");
                    return View(model);
                }

                return RedirectToAction(nameof(HomeController.Index), "Home");

               
            }
            else
            {
                return View(model);
            }
        }

        [HttpGet]
        public IActionResult Logout()
        {
           
            _signinManager.SignOutAsync();

            return RedirectToAction(actionName: "Index", controllerName:"Home");
        }
    }
}
