using BilgehNBS.Mappers;
using BilgehNBS.Models;
using BilgehNBSCore.Domain.Abstract;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Factories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BilgehNBS.Controllers

   
{
    [Authorize(Roles = "Admin, User")]
    public class HomeController : ControllerBase
    {
        private readonly IdCardInformationEndpointService _idCardInformation;

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, IdCardInformationEndpointService idCardInformation)
        {
            _logger = logger;
            _idCardInformation = idCardInformation;
        }

        public IActionResult Index()
        {
            SearchModel search = new SearchModel();
            return View(search);
        }

       [HttpPost]
        public IActionResult Search(SearchModel search)
        {

            //List<Family> FamilyEntityList = new List<Family>();
           // List<Guest> GuestEntityList = new List<Guest>();

            if (search.Surname == null) { search.Surname = ""; }
            if (search.Fathername == null) { search.Fathername = ""; }
            if (search.Name == null) { search.Name = ""; }
            //if (search.CarNumber == null) { search.CarNumber = ""; }

            if (Convert.ToBoolean(search.Persontype1) == true)
            {
                try
                {
                    // List<Employee> EmployeEntityList = new List<Employee>();

                    IEnumerable<Employee> EmployeEntityList;

                    if (search.CarNumber == null) {

                        EmployeEntityList = DB.EmployeeRepository.Get().Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent==true && x.InputOrOutput==true).First().CrossingTime >= search.FromDatetime
                            //&& x.PersonWithType.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(true)).First().CarNumber == search.CarNumber
                           && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                           && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                           && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                           && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower()));
                    }else
                    {
                        EmployeEntityList = DB.EmployeeRepository.Get().Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent==true && x.InputOrOutput==true).First().CrossingTime >= search.FromDatetime
                           && x.PersonWithType.Crossing.Where(x => x.Permanent==true && x.InputOrOutput==true).First().CarNumber == search.CarNumber
                           && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                           && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                           && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                           && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower()));
                    }

                   






                    foreach (var employeeItem in EmployeEntityList)
                    {
                        EmployeeModel employee = new EmployeeModel();
                        employee = EmployeeMapper.Map(employeeItem);
                        search.EmployeeList.Add(employee);
                    }
                }
                catch (Exception a) { }

            }
            if (Convert.ToBoolean(search.Persontype2) == true)
            {
                try
                {
                    DB.EmployeeRepository.Get();
                }
                catch (Exception a) { }
                try
                {


                    IEnumerable<Family> FamilyEntityList;
                    if (search.CarNumber == null)
                    {
                            FamilyEntityList = DB.FamilyRepository.Get().Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent==true && x.InputOrOutput==true).First().CrossingTime >= search.FromDatetime
                                //&& x.PersonWithType.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(true)).First().CarNumber == search.CarNumber
                                && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                                && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                                && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                                && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower())
                            );
                    }else
                    {
                        FamilyEntityList = DB.FamilyRepository.Get().Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent==true && x.InputOrOutput==true).First().CrossingTime >= search.FromDatetime
                                && x.PersonWithType.Crossing.Where(x => x.Permanent==true && x.InputOrOutput==true).First().CarNumber == search.CarNumber
                                && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                                && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                                && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                                && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower())
                            );
                    }

                   

                    foreach (var familyitem in FamilyEntityList)
                    {
                        FamilyModel family = new FamilyModel();
                        family = FamilyMapper.Map(familyitem);
                        family.Employee = new EmployeeModel();
                        family.Employee = EmployeeMapper.Map(familyitem.Employee);
                        search.FamilyList.Add(family);
                    }

                }
                catch (Exception a) { }



            }
            if (Convert.ToBoolean(search.Persontype3) == true)
            {
                try{
                    DB.EmployeeRepository.Get();
                }catch (Exception a) { }
                try
                {

                   
                    IEnumerable<Guest> GuestEntityList;
                    if (search.CarNumber == null)
                    {
                        GuestEntityList = DB.GuestRepository.Get().Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime >= search.FromDatetime
                            //&& x.PersonWithType.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(true)).First().CarNumber == search.CarNumber
                            && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                            && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                            && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                            && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower())
                        );
                    }
                    else
                    {
                        GuestEntityList = DB.GuestRepository.Get().Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime >= search.FromDatetime
                                && x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CarNumber == search.CarNumber
                                && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                                && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                                && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                                && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower())
                            );
                    }



                    foreach (var guestitem in GuestEntityList)
                    {
                        GuestModel guest = new GuestModel();
                        guest = GuestMapper.Map(guestitem);
                        guest.Employee = new EmployeeModel();
                        guest.Employee = EmployeeMapper.Map(guestitem.Employee);
                        search.GuestList.Add(guest);
                    }

                }
                catch (Exception a) { }



            }

            if (Convert.ToBoolean(search.Persontype4) == true)
            {
                try
                {
                    DB.WorkerRepository.Get();
                }
                catch (Exception a) { }
                try
                {


                    IEnumerable<Worker> WorkerEntityList;
                    if (search.CarNumber == null)
                    {
                        WorkerEntityList = DB.WorkerRepository.Get().Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime >= search.FromDatetime
                            //&& x.PersonWithType.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(true)).First().CarNumber == search.CarNumber
                            && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                            && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                            && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                            && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower())
                        );
                    }
                    else
                    {
                        WorkerEntityList = DB.WorkerRepository.Get().Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime >= search.FromDatetime
                                && x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CarNumber == search.CarNumber
                                && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                                && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                                && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                                && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower())
                            );
                    }



                    foreach (var workeritem in WorkerEntityList)
                    {
                        WorkerModel worker = new WorkerModel();
                        worker = WorkerMapper.Map(workeritem);
                        worker.WorkerParentModel = new WorkerParentModel();
                        worker.WorkerParentModel = WorkerParentMapper.Map(workeritem.WorkerParent);
                        search.WorkerList.Add(worker);
                    }

                }
                catch (Exception a) { }



            }
            if (Convert.ToBoolean(search.Persontype5) == true)
            {
                try
                {
                    // List<Employee> EmployeEntityList = new List<Employee>();

                    IEnumerable<Employee> EmployeEntityList;

                    if (search.CarNumber == null)
                    {

                        EmployeEntityList = DB.EmployeeRepository.Get().Where(x=>x.IsReception==true).Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime >= search.FromDatetime
                           //&& x.PersonWithType.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(true)).First().CarNumber == search.CarNumber
                           && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                           && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                           && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                           && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower()));
                    }
                    else
                    {
                        EmployeEntityList = DB.EmployeeRepository.Get().Where(x => x.IsReception == true).Where(x => x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime >= search.FromDatetime
                           && x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CarNumber == search.CarNumber
                           && (x.PersonWithType.Crossing.Where(x => x.Permanent == true && x.InputOrOutput == true).First().CrossingTime <= search.TillDatatime)
                           && x.IdCardInformation.Surname.ToLower().Contains(search.Surname.ToLower())
                           && x.IdCardInformation.FatherName.ToLower().Contains(search.Fathername.ToLower())
                           && x.IdCardInformation.Name.ToLower().Contains(search.Name.ToLower()));
                    }








                    foreach (var employeeItem in EmployeEntityList)
                    {
                        EmployeeModel employee = new EmployeeModel();
                        employee = EmployeeMapper.Map(employeeItem);
                        search.EmployeeListReception.Add(employee);
                    }
                }
                catch (Exception a) { }

            }

            return View("Index", search);
        }








        //yazilmali olan servis

        public async Task<JsonResult> GetDocDataByStr(string base64)
        {

           

            var client = await _idCardInformation.GetPinAl(base64);

            if (client == null)
            {
                return Json("Err");
            }

            return Json(client);

        }










        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<JsonResult> IdCardByPin(string pin, string regType)
        {
            var client = await _idCardInformation.IdCardByPinOrSeria(pin);

            if (client == null) {
                return Json("Err");
            }
            
            IdCardInformation idCardInformation = IdCardInformation(client);
            // idCardInformation.UserId = "e0c01465-793e-4541-b2e8-231b7f1d3a66";
            //idCardInformation.UserId = (await _userManager.GetUserAsync(User)).Id.ToString();

          

            if (client.Data.Data != null)
            {
                client.Data.Data.Person.Images[0].Image = "data:image/jpeg;base64," + client.Data.Data.Person.Images[0].Image;
            }

            return Json(client);

        }


        //bura atarsan
        public async Task<JsonResult> IdCardByNSP(string name, string surname, string patronymic)
        {
            var client = await _idCardInformation.IdCardByNSP(name, surname, patronymic);

            return Json(client);
        }



        public IdCardInformation IdCardInformation(IDataResult<IdCardDto> idCardDto)
        {
            IdCardInformation idCardInformation = new IdCardInformation();


            idCardInformation.Name = idCardDto.Data?.Data?.Person?.NameAz != null ? idCardDto.Data?.Data?.Person?.NameAz : "";
            idCardInformation.Surname = idCardDto.Data?.Data?.Person?.SurnameAz != null ? idCardDto.Data?.Data?.Person?.SurnameAz : "";
            idCardInformation.Patronymic = idCardDto.Data?.Data?.Person?.PatronymicAz != null ? idCardDto.Data?.Data?.Person?.PatronymicAz : "";
            idCardInformation.Pin = idCardDto.Data?.Data?.Person?.PIN != null ? idCardDto.Data?.Data?.Person?.PIN : "";
            idCardInformation.Height = idCardDto.Data?.Data?.Person?.Height != null ? idCardDto.Data?.Data?.Person?.Height : "";
            idCardInformation.BirthDate = idCardDto.Data?.Data?.Person?.BirthDate != null ? idCardDto.Data?.Data?.Person?.BirthDate : "";
            idCardInformation.BirthAddress = idCardDto.Data?.Data?.Person?.BirthAddress?.City != null ? idCardDto.Data?.Data?.Person?.BirthAddress?.City : "";
            idCardInformation.BloodType = idCardDto.Data?.Data?.Person?.BloodType?.Description != null ? idCardDto.Data?.Data?.Person?.BloodType?.Description : "";
            idCardInformation.Gender = idCardDto.Data?.Data?.Person?.Gender?.Description != null ? idCardDto.Data?.Data?.Person?.Gender?.Description : "";
            idCardInformation.MaritalStatus = idCardDto.Data?.Data?.Person?.MaritalStatus?.Description != null ? idCardDto.Data?.Data?.Person?.MaritalStatus?.Description : "";
            idCardInformation.EyeColor = idCardDto.Data?.Data?.Person?.EyeColor?.Description != null ? idCardDto.Data?.Data?.Person?.EyeColor?.Description : "";
            idCardInformation.EyeColor = idCardDto.Data?.Data?.Person?.EyeColor?.Description != null ? idCardDto.Data?.Data?.Person?.EyeColor?.Description : "";
            idCardInformation.RegistrationAddress = idCardDto.Data?.Data?.Person?.IAMASAddress?.FullAddress != null ? idCardDto.Data?.Data?.Person?.IAMASAddress?.FullAddress : "";
            idCardInformation.Image = "data:image/jpeg;base64," + idCardDto.Data?.Data?.Person?.Images[0]?.Image;
            idCardInformation.ActivationDate = idCardDto.Data?.Data?.Document?.ActivationDate != null ? idCardDto.Data?.Data?.Document?.ActivationDate : "";
            idCardInformation.DeActivationReason = idCardDto.Data?.Data?.Document?.DeactivationReason != null ? idCardDto.Data?.Data?.Document?.DeactivationReason : "";
            idCardInformation.PassportNumber = idCardDto.Data?.Data?.Document?.Number != null ? idCardDto.Data?.Data?.Document?.Number : "";
            idCardInformation.ExpireDate = idCardDto.Data?.Data?.Document?.ExpireDate != null ? idCardDto.Data?.Data?.Document?.ExpireDate : "";
            idCardInformation.GivenDate = idCardDto.Data?.Data?.Document?.GivenDate != null ? idCardDto.Data?.Data?.Document?.GivenDate : "";
            idCardInformation.GivenOrganizatoin = idCardDto.Data?.Data?.Document?.GivenOrganization != null ? idCardDto.Data?.Data?.Document?.GivenOrganization : "";
            idCardInformation.Status = idCardDto.Data?.Data?.Document?.Status != null ? idCardDto.Data?.Data?.Document?.Status : "";
            idCardInformation.CreateDate = DateTime.Now;

            return idCardInformation;
        }
    }
}
