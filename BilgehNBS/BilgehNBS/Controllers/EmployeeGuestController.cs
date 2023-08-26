using BilgehNBS.Mappers;
using BilgehNBS.Models;
using BilgehNBSCore.Domain.Entities;
using BilgehNBSCore.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BilgehNBS.Controllers
{
    [Authorize(Roles = "Admin, User")]
    public class EmployeeGuestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Employees()
        {

            //db
            List<EmployeeModel> EmployeeModelList = new List<EmployeeModel>();
            List<Employee> EmployeeListFiltered = new List<Employee>();



            //var activeMembers = DB.EmployeeRepository.Get().Where(x=> x.)

            var employeEntity = DB.EmployeeRepository.Get().Where(x => x.IsGuestInviter == true && x.IsReception == false).ToList();


            var filteredEmployeeList = new List<Employee>();



            for (var i = 0; i < employeEntity.Count; i++)
            {
                var Employeee = new Employee();
                List<Guest> GuestListFiltered = new List<Guest>();
                bool checkShouldItemAddIsAttended = true;
                bool checkShouldItemAdd = true;

                if (employeEntity[i].IsAttended)
                {
                    bool checkEmployeeCrossing = (employeEntity[i].PersonWithType.Crossing.Where(x => (x.InputOrOutput == false) && (x.Permanent == true)).FirstOrDefault() != null);

                    if (checkEmployeeCrossing)
                    {
                        checkShouldItemAddIsAttended = false;
                        int em = 0;
                        foreach (var guestItem in employeEntity[i].GuestList)
                        {
                            bool checkGuestCrossing = (guestItem.PersonWithType.Crossing.Where(x => x.InputOrOutput == false && x.Permanent == true).FirstOrDefault() != null);

                            if (!checkGuestCrossing)
                            {
                                em = em + 1;
                            }

                        }
                        if (em > 0) { checkShouldItemAddIsAttended = true; }
                    }
                    else
                    {


                        checkShouldItemAddIsAttended = true;

                        foreach (var guestItem in employeEntity[i].GuestList)
                        {
                            bool checkFamilyCrossing = (guestItem.PersonWithType.Crossing.Where(x => x.InputOrOutput == false && x.Permanent == true).FirstOrDefault() != null);

                            if (checkEmployeeCrossing)
                            {
                                //cixisi olanlar
                                checkShouldItemAddIsAttended = false;
                            }
                            else
                            {
                                GuestListFiltered.Add(guestItem);
                                checkShouldItemAddIsAttended = true;
                            }
                        }
                    }
                    if (checkShouldItemAddIsAttended)
                    {
                        Employeee = employeEntity[i];

                        if (GuestListFiltered.Count > 0)
                        {
                            Employeee.GuestList = new List<Guest>();
                            Employeee.GuestList = GuestListFiltered;
                        }
                        filteredEmployeeList.Add(employeEntity[i]);
                    }
                }
                else
                {
                    int a = 0;
                    foreach (var item in employeEntity[i].GuestList)
                    {
                        bool checkGuestOutputCrossing = (item.PersonWithType.Crossing.Where(x => (x.InputOrOutput == false) && (x.Permanent == true)).FirstOrDefault() != null);
                        if (!checkGuestOutputCrossing)
                        {
                            //checkShouldItemAdd = false;
                            a = a + 1;
                        }
                    }

                    if (a > 0)
                    {
                        filteredEmployeeList.Add(employeEntity[i]);
                    }
                }
            }





            //foreach (var item in employeEntity)
            //{
            //    //EmployeeModelListFiltered = 
            //    if (item.PersonWithType.Crossing.Where(x => (x.InputOrOutput == false) && (x.Permanent == true)).FirstOrDefault() != null)
            //    {
            //        if (item.FamilyList.Count != 0)
            //        {
            //            var FamilyEntityList = new List<Family>();
            //            foreach (var family in item.FamilyList)
            //            {
            //                //var crossing = family.PersonWithType.Crossing.Where(x => x.InputOrOutput.Equals(false) && x.Permanent.Equals(true)).FirstOrDefault();
            //                if (family.PersonWithType.Crossing.Where(x => x.InputOrOutput.Equals(false) && x.Permanent.Equals(true)).FirstOrDefault() == null)
            //                {
            //                    FamilyEntityList.Add(family);
            //                }

            //            }
            //            item.FamilyList = FamilyEntityList;
            //            EmployeeListFiltered.Add(item);


            //        }
            //       // else if (item.PersonWithType.Crossing.Where(x => (x.InputOrOutput == true) && (x.Permanent == true)).FirstOrDefault() == null)
            //       // { EmployeeListFiltered.Add(item); }

            //    }
            //    int a = 3;
            //}


            //foreach (var employeeItem in EmployeeListFiltered)
            //{
            //    EmployeeModel employee = new EmployeeModel();
            //    employee = EmployeeMapper.Map(employeeItem);
            //    EmployeeModelList.Add(employee);
            //}

            foreach (var employeeItem in filteredEmployeeList)
            {
                EmployeeModel employee = new EmployeeModel();
                employee = EmployeeMapper.Map(employeeItem);
                EmployeeModelList.Add(employee);
            }


            var count = 0;

            for (var i = 0; i < EmployeeModelList.Count; i++)
            {
                count += EmployeeModelList[i].GuestList.Count;
                var checkExitEmployee = EmployeeModelList[i].PersonWithtype.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(false)).ToList();
                if (EmployeeModelList[i].IsAttended && (checkExitEmployee.Count == 0))
                {
                    count += 1;
                }

                for (var g = 0; g < EmployeeModelList[i].Family.Count; g++)
                {
                    var checkExit = EmployeeModelList[i].GuestList[g].PersonWithType.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(false)).ToList();
                    if (checkExit.Count > 0)
                    {
                        count -= 1;
                    }
                }
            }

            ViewData["EmployeeCount"] = count;
            ViewData["Category"] = "qonaq qəbul edən işçilərin qonaqlarla birlikdə";

            return View("EmployeeGuest", EmployeeModelList);
        }
        //public IActionResult EmployeeGuest()
        //{
        //    List<EmployeeModel> EmployeeModelList = new List<EmployeeModel>();
        //    var employeEntity = DB.EmployeeRepository.Get().Where(x => x.IsGuestInviter.Equals(true) && x.IsReception.Equals(false));
        //    foreach (var employeeItem in employeEntity)
        //    {
        //        EmployeeModel employee = new EmployeeModel();
        //        employee = EmployeeMapper.Map(employeeItem);
        //        EmployeeModelList.Add(employee);
        //    }

        //    return View(EmployeeModelList);

        //}

        private IdCardInformationModel JsonModeltoIdcardInformationModel(ModelforJson row, IdCardInformationModel idCardModel)
        {
            idCardModel.Name = row.Name;
            idCardModel.Surname = row.Surname;
            idCardModel.FatherName = row.FatherName;
            idCardModel.Patronymic = row.Patronymic;
            idCardModel.PassportNumber = row.PassportNumber;
            idCardModel.BirthAddress = row.BirthAddress;
            idCardModel.BirthDate = row.BirthDate;
            idCardModel.RegistrationAddress = row.RegistrationAddress;
            idCardModel.GivenOrganizatoin = row.GivenOrganizatoin;
            idCardModel.MaritalStatus = row.MaritalStatus;
            idCardModel.BloodType = row.BloodType;
            idCardModel.Height = row.Height;
            idCardModel.EyeColor = row.EyeColor;
            idCardModel.GivenDate = row.GivenDate;
            idCardModel.ExpireDate = row.ExpireDate;
            idCardModel.Pin = row.Pin;
            idCardModel.ActivationDate = row.ActivationDate;
            idCardModel.DeActivationReason = row.DeActivationReason;
            idCardModel.Status = row.Status;
            idCardModel.Image = row.Image;
            idCardModel.Gender = row.Gender;

            return idCardModel;
        }

        public IActionResult Add()
        {
            PWTModel pWTEmployeeFamilyModel = new PWTModel();

            pWTEmployeeFamilyModel.Crossing = new List<CrossingModel>();
            pWTEmployeeFamilyModel.Crossing.Add(new CrossingModel());

            return View("EmployeeGuest_add", pWTEmployeeFamilyModel);
        }


        [HttpPost]
        public async Task<IActionResult> AddCollectData(string data)
        {

            EmployeeModel employee = new EmployeeModel();
            int a = 0;
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));
            //List<PWTEmployeeFamilyModel>pWTEmployeeFamilyModelList = new List<PWTEmployeeFamilyModel>();



            // pWTEmployeeFamilyModel.Crossing = new List<CrossingModel>();
            // pWTEmployeeFamilyModel.Crossing.Add(new CrossingModel());


            List<PWTModel> pWTEmployeeFamilyModelList = new List<PWTModel>();
           
            var modelforJson = JsonConvert.DeserializeObject<List<ModelforJson>>(data);
            foreach (var row in modelforJson)
            {
                if (row.PersonType == PersonTypeEnum.Employee) //1-emekdasin kodu
                {

                    PWTModel pWTEmployeeFamilyModel = new PWTModel();
                    pWTEmployeeFamilyModel.PersonTypeId = row.PersonType;

                    pWTEmployeeFamilyModel.Crossing = new List<CrossingModel>();
                    CrossingModel crossing = new CrossingModel();
                    crossing.CrossingTime = row.CrossingTime;

                    crossing.IsDriver = row.IsDriver;
                    crossing.CarNumber = row.CarNumber;
                    crossing.InputOrOutput = true;
                    crossing.Permanent = true;
                    crossing.Note = row.Note;

                    crossing.Creator = user;

                    pWTEmployeeFamilyModel.Crossing.Add(crossing);
                    employee.PersonWithtype = new PWTModel();
                    employee.PersonWithtype = pWTEmployeeFamilyModel;
                    employee.Note = row.Note;
                    
                    employee.CreationDate = row.CreationDate;
                    employee.IsAttended = row.IsAttended;
                    employee.IsGuestInviter = true;
                    //var yu = row.EventParticipants;
                    employee.IsReception = false;

                    try
                    {
                        employee.ChildCount = Int32.Parse(row.ChildCount);
                    }
                    catch (Exception ex) { }
                    employee.IdCardInformation = new IdCardInformationModel();
                    employee.IdCardInformation = JsonModeltoIdcardInformationModel(row, employee.IdCardInformation);






                }
                else if (row.PersonType == 3) //2- guest code
                {
                    if (a == 0) { employee.GuestList = new List<GuestModel>(); }
                    GuestModel guestmodel = new GuestModel();
                    PWTModel pWTEmployeeFamilyModel = new PWTModel();
                    pWTEmployeeFamilyModel.PersonTypeId = row.PersonType;
                    guestmodel.PersonWithType = new PWTModel();
                    guestmodel.EventParticipants = row.EventParticipants;

                    pWTEmployeeFamilyModel.Crossing = new List<CrossingModel>();
                    CrossingModel crossing = new CrossingModel();
                    crossing.CrossingTime = row.CrossingTime;
                    crossing.CarNumber = row.CarNumber;
                    crossing.Permanent = true;
                    crossing.InputOrOutput = true;
                    crossing.Creator = user;
                    crossing.Note = row.Note;
                    pWTEmployeeFamilyModel.Crossing.Add(crossing);
                    // guestmodel.RelativeType = row.RelativeType;
                    // familymodel.CreationDate = row.CreationDate;
                    //guestmodel.IsReception = false;
                    guestmodel.IdCardInformation = new IdCardInformationModel();
                    guestmodel.IdCardInformation = JsonModeltoIdcardInformationModel(row, guestmodel.IdCardInformation);

                    guestmodel.PersonWithType = pWTEmployeeFamilyModel;
                    employee.GuestList.Add(guestmodel);


                    //pWTEmployeeFamilyModelList.Add(pWTEmployeeFamilyModel);

                    a++;
                }

            }



            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Employee employeeEntity = new Employee();
            employeeEntity = EmployeeMapper.Map(employee, employeeEntity);
            // employeeEntity.PersonWithType.Crossing[0].Creator = DB.UserRepository.FindById(Convert.ToInt32(userId));
            DB.EmployeeRepository.Add(employeeEntity);


            // employeeEntity.PersonWithType = new PersonWithType();
            employeeEntity.PersonWithType.PersonId = employeeEntity.Id;
            if (employeeEntity.GuestList != null)
            {
                for (int j = 0; j < employeeEntity.GuestList.Count; j++)
                {
                    //employeeEntity.Family[j].PersonWithType = new PersonWithType();
                    employeeEntity.GuestList[j].PersonWithType.PersonId = employeeEntity.GuestList[j].Id;
                }
            }
            //Employee employeeEntityup = new Employee();
            //  employeeEntityup = EmployeeMapper.Map(employee, employeeEntity);
            DB.EmployeeRepository.Update(employeeEntity);

            //List<PersonWithType>PersonListEntity = new List<PersonWithType>();
            //PersonWithType entitypersonforAdd  = new PersonWithType();



            //entitypersonforAdd= PersonWithTypeMapper.Map(pWTEmployeeFamilyModelList[i], entitypersonforAdd);
            //PersonListEntity.Add(entitypersonforAdd);


            //foreach (var person in employee.Family)
            //{
            //    i = i + 1;

            //    PersonWithType entitypersonforAdd2 = new PersonWithType();
            //    pWTEmployeeFamilyModelList[i].PersonType = PersonTypeEnum.Family;
            //    pWTEmployeeFamilyModelList[i].PersonId = person.Id;
            //    entitypersonforAdd2 = PersonWithTypeMapper.Map(pWTEmployeeFamilyModelList[i], entitypersonforAdd2);
            //    PersonListEntity.Add(entitypersonforAdd);
            //}
            ////int y = 7;
            //// List<PWTEmployeeFamilyModel> pWTEmployeeFamilyModelList = new List<PWTEmployeeFamilyModel>();
            //DB.PersonWithTypeRepository.AddList(PersonListEntity);



            // return Redirect("EmployeesFamily/Employees");
            //turn View("Employees");
            //turn RedirectToAction("Employees", new { id =  });
            //return RedirectToAction("Employees","EmployeesFamily");
            //return RedirectToAction("Employees");
            return Json("OK");
        }

        public IActionResult GuestPermenantQuitAll(string MemberId, string type)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));
            //string idleri int massivine yigir
            //string[] values = MemberIds.Split(',');
            //int[] intids = new int[values.Length - 1];
            //for (int i = 0; i < values.Length - 1; i++)
            //{
            //    intids[i] = Convert.ToInt32(values[i].Trim());
            //}

            //// crossingleri bazadan getirir idlere uygun
            //var CrossingList = new List<Crossing>();
            //for (int i = 0; i < intids.Length; i++)
            //{
            //    CrossingList.Add(DB.CrossingRepository.FindById(intids[i]));
            //}
            int id = Convert.ToInt32(MemberId);
            var employee = DB.EmployeeRepository.FindById(id);


            foreach (var guestmember in employee.GuestList)
            {
                var PermenanExit = guestmember.PersonWithType.Crossing.Where(x => x.InputOrOutput == false && x.Permanent == true).FirstOrDefault();
                if (PermenanExit == null)
                {
                    Crossing output = new Crossing();
                    //output.CarNumber = cro.CarNumber;
                    output.CrossingTime = DateTime.Now;
                    output.InputOrOutput = false;
                    output.Creator = user;
                    if (type == "1")
                    {
                        output.Permanent = true;
                    }
                    else { output.Permanent = false; }
                    //output.Note
                    output.PersonWithType = guestmember.PersonWithType;
                    guestmember.PersonWithType.Crossing.Add(output);
                }
            }
            DB.EmployeeRepository.Update(employee);

            ////crossinglere uygun yeni crossingler yaradir cixis ucun 
            //foreach (var cro in CrossingList)
            //{
            //    Crossing output = new Crossing();
            //    //output.CarNumber = cro.CarNumber;
            //    output.CrossingTime = DateTime.Now;
            //    output.InputOrOutput = false;

            //    if (type == "1")
            //    {
            //        output.Permanent = true;
            //    }
            //    //output.Note
            //    output.PersonWithType = cro.PersonWithType;

            //    DB.CrossingRepository.Add(cro);

            //}

            return RedirectToAction("Employees");
        }

        public IActionResult Guest(string employeeId)
        {

            var employemodel = EmployeeMapper.Map(DB.EmployeeRepository.FindById(Convert.ToInt32(employeeId)));
            return View(employemodel);
        }

        public IActionResult GuestMembertemporaryExitOrEnter(string employeeID, string guestMemberID, string inputOutput)
        {
            int employeeid = Convert.ToInt32(employeeID);
            var employee = DB.EmployeeRepository.FindById(employeeid);


            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));

            foreach (var guestyitem in employee.GuestList)

            {

                if (guestyitem.Id == Convert.ToInt32(guestMemberID))
                {
                    Crossing output = new Crossing();
                    //output.CarNumber = cro.CarNumber;
                    output.CrossingTime = DateTime.Now;
                    if (inputOutput == "0")
                    {
                        output.InputOrOutput = false;
                    }
                    else
                    {
                        output.InputOrOutput = true;
                    }
                    output.Permanent = false;
                    output.Creator = user;
                    //output.Note
                    output.PersonWithType = guestyitem.PersonWithType;
                    guestyitem.PersonWithType.Crossing.Add(output);
                }
            }
            DB.EmployeeRepository.Update(employee);

            return RedirectToAction("Employees");

            //return Redirect("Employees");

        }

        public IActionResult GuestMemberpermenantExit(string employeeID, string guestMemberID)
        {
            int employeeid = Convert.ToInt32(employeeID);
            var employee = DB.EmployeeRepository.FindById(employeeid);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));

            foreach (var guestitem in employee.GuestList)

            {

                if (guestitem.Id == Convert.ToInt32(guestMemberID))
                {
                    Crossing output = new Crossing();
                    //output.CarNumber = cro.CarNumber;
                    output.CrossingTime = DateTime.Now;
                    output.InputOrOutput = false;


                    output.Permanent = true;
                    output.Creator = user;

                    //output.Note
                    output.PersonWithType = guestitem.PersonWithType;
                    guestitem.PersonWithType.Crossing.Add(output);

                }
            }
            DB.EmployeeRepository.Update(employee);

            return RedirectToAction("Employees");
        }

        public IActionResult EmployeeExit(string MemberId, string type, string inputOutput)
        {
            int id = Convert.ToInt32(MemberId);
            var employee = DB.EmployeeRepository.FindById(id);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));

            Crossing output = new Crossing();
            //output.CarNumber = cro.CarNumber;
            output.CrossingTime = DateTime.Now;
            output.InputOrOutput = false;
            output.Creator = user;
            if (type == "1")
            {
                output.Permanent = true;
            }
            else { output.Permanent = false; }
            //output.Note
            //output.PersonWithType = employee.PersonWithType;

            if (inputOutput == "0")
            {
                output.InputOrOutput = false;
            }
            else
            {
                output.InputOrOutput = true;
            }

            employee.PersonWithType.Crossing.Add(output);

            DB.EmployeeRepository.Update(employee);
            //return Json("OK");
            return RedirectToAction("Employees");
        }
    }
}
