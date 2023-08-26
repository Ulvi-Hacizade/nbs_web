using AutoMapper;
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
    public class EmployeesFamilyController : ControllerBase
    {
        [HttpGet]
        public IActionResult Employees()
        {
            //db
            List<EmployeeModel> EmployeeModelList = new List<EmployeeModel>();
            List<Employee> EmployeeListFiltered = new List<Employee>();

            //var activeMembers = DB.EmployeeRepository.Get().Where(x=> x.)

            var employeEntity = DB.EmployeeRepository.Get().Where(x => x.IsGuestInviter.Equals(false)).ToList();

            var filteredEmployeeList = new List<Employee>();

            for (var i = 0; i < employeEntity.Count; i++) {
                var Employeee = new Employee();
                List<Family> FamilyListFiltered = new List<Family>();
                bool checkShouldItemAddIsAttended = true;
                bool checkShouldItemAdd = true;

                if (employeEntity[i].IsAttended)
                {
                    bool checkEmployeeCrossing = (employeEntity[i].PersonWithType.Crossing.Where(x => (x.InputOrOutput == false) && (x.Permanent == true)).FirstOrDefault() != null);

                    if (checkEmployeeCrossing)
                    {
                        checkShouldItemAddIsAttended = false;
                        int em = 0;
                        foreach (var familiyItem in employeEntity[i].FamilyList)
                        {
                            bool checkFamilyCrossing = (familiyItem.PersonWithType.Crossing.Where(x => x.InputOrOutput == false && x.Permanent == true).FirstOrDefault() != null);

                            if (!checkFamilyCrossing)
                            {
                                em = em + 1;
                            }
                            
                        }
                        if (em > 0) { checkShouldItemAddIsAttended = true; }
                    }
                    else {


                        checkShouldItemAddIsAttended = true;

                        foreach (var familiyItem in employeEntity[i].FamilyList)
                        {
                            bool checkFamilyCrossing = (familiyItem.PersonWithType.Crossing.Where(x => x.InputOrOutput == false && x.Permanent == true).FirstOrDefault() != null);

                            if (checkEmployeeCrossing)
                            {
                                //cixisi olanlar
                                checkShouldItemAddIsAttended = false;
                            }
                            else
                            {
                                FamilyListFiltered.Add(familiyItem);
                                checkShouldItemAddIsAttended = true;
                            }
                        }
                    }
                    if (checkShouldItemAddIsAttended)
                    {
                        Employeee = employeEntity[i];

                        if (FamilyListFiltered.Count > 0) {
                            Employeee.FamilyList = new List<Family>();
                            Employeee.FamilyList = FamilyListFiltered;
                        }
                        filteredEmployeeList.Add(employeEntity[i]);
                    }
                }else
                {
                    int a = 0;
                    foreach (var item in employeEntity[i].FamilyList) 
                    {
                        bool checkFamilyOutputCrossing = (item.PersonWithType.Crossing.Where(x => (x.InputOrOutput == false) && (x.Permanent == true)).FirstOrDefault() != null);
                        if (!checkFamilyOutputCrossing)
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

            var employeeReception= DB.EmployeeRepository.Get().Where(x => x.IsGuestInviter.Equals(false) && x.IsReception.Equals(true)).ToList();

            var count = 0;

            for (var i = 0; i < EmployeeModelList.Count; i++)
            {
                count += EmployeeModelList[i].Family.Count;
                var checkExitEmployee = EmployeeModelList[i].PersonWithtype.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(false)).ToList();
                if (EmployeeModelList[i].IsAttended && (checkExitEmployee.Count==0))
                {
                    count += 1;
                }

                for (var g = 0; g < EmployeeModelList[i].Family.Count; g++)
                {
                    var checkExit = EmployeeModelList[i].Family[g].PersonWithType.Crossing.Where(x => x.Permanent.Equals(true) && x.InputOrOutput.Equals(false)).ToList();
                    if (checkExit.Count > 0)
                    {
                        count -= 1;
                    }
                }
            }

            ViewData["EmployeeCount"] = count;
            ViewData["Category"] = "işçi və ailə üzvlərinin";

            return View("Employees", EmployeeModelList);
        }



        //[HttpGet]
        //public IActionResult Employees_add()
        //{
        //    return View();
        //}


        public IActionResult FamilyTemporaryQuit(string MemberId, string type)
        {



            return View();
        }
        


        public IActionResult EmployeeExit(string MemberId, string type, string inputOutput, string note, string time, string fromJS)
        {
            int id = Convert.ToInt32(MemberId);
            var employee = DB.EmployeeRepository.FindById(id);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));

            Crossing output = new Crossing();
            //output.CarNumber = cro.CarNumber;



            if (time != null)
            {
                output.CrossingTime = Convert.ToDateTime(time);

            }
            else
            {
                output.CrossingTime = DateTime.Now;
            }
            // output.InputOrOutput = false;
            if (note != null) { output.Note=note; }
           
            output.Creator = user;
                if (type == "1")
                {
                    output.Permanent = true;
                }
                else { output.Permanent = false; }
            //output.Note
            //output.PersonWithType = employee.PersonWithType;

            if (inputOutput == "0") {
                output.InputOrOutput = false;
            }else
            {
                output.InputOrOutput = true;
            }

                employee.PersonWithType.Crossing.Add(output);
            DB.EmployeeRepository.Update(employee);

            if (fromJS == "true")
            {
                return Json("OK");
            }
            
          
           return RedirectToAction("Employees");
          //  return RedirectToAction("Home");
        }

        public IActionResult FamilyMemberpermenantExit(string employeeID, string familyMemberID, string note, string time)
        {
            int employeeid = Convert.ToInt32(employeeID);
            var employee = DB.EmployeeRepository.FindById(employeeid);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));

            foreach (var familyitem in employee.FamilyList)

            {

                if (familyitem.Id == Convert.ToInt32(familyMemberID))
                {
                    Crossing output = new Crossing();
                    //output.CarNumber = cro.CarNumber;
                    if (time != null)
                    {
                        output.CrossingTime = Convert.ToDateTime(time);

                    }
                    else
                    {
                        output.CrossingTime = DateTime.Now;
                    }
                    output.InputOrOutput = false;
                    if (note != null) { output.Note = note; }

                    output.Permanent = true;
                    output.Creator = user;
                  
                    //output.Note
                    output.PersonWithType = familyitem.PersonWithType;
                    familyitem.PersonWithType.Crossing.Add(output);

                }
            }
            DB.EmployeeRepository.Update(employee);

            return Json("OK");
        }

        //------------------------------------------------------------------------------------------
        public IActionResult FamilyMembertemporaryExitOrEnter(string employeeID, string familyMemberID, string inputOutput) {
            int employeeid = Convert.ToInt32(employeeID);
            var employee = DB.EmployeeRepository.FindById(employeeid);


            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));

            foreach (var familyitem in employee.FamilyList)

            {

                if (familyitem.Id == Convert.ToInt32(familyMemberID))
                {
                    Crossing output = new Crossing();
                    //output.CarNumber = cro.CarNumber;
                    output.CrossingTime = DateTime.Now;
                    if (inputOutput == "0") { 
                        output.InputOrOutput = false;
                    }else
                    {
                        output.InputOrOutput = true;
                    }
                    output.Permanent = false;
                    output.Creator = user;
                    //output.Note
                    output.PersonWithType = familyitem.PersonWithType;
                    familyitem.PersonWithType.Crossing.Add(output);
                }
            }
            DB.EmployeeRepository.Update(employee);

            // var employemodel = EmployeeMapper.Map(employee);
            var employemodel = EmployeeMapper.Map(DB.EmployeeRepository.FindById(employee.Id));
            return View("Family",employemodel);

            //return Redirect("Employees");
 
        }
        //------------------------------------------------------------------------------------------


     

        public IActionResult FamilyTemporaryQuitAll(string MemberId, string type)
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
            int id= Convert.ToInt32(MemberId);
            var employee = DB.EmployeeRepository.FindById(id);


            foreach (var familymember in employee.FamilyList)
            {
                var PermenanExit = familymember.PersonWithType.Crossing.Where(x => x.InputOrOutput == false && x.Permanent == true).FirstOrDefault();
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
                    output.PersonWithType = familymember.PersonWithType;
                    familymember.PersonWithType.Crossing.Add(output);
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


        [HttpGet]
        public IActionResult Add()
        {
            PWTModel pWTEmployeeFamilyModel = new PWTModel();

            pWTEmployeeFamilyModel.Crossing = new List<CrossingModel>();
            pWTEmployeeFamilyModel.Crossing.Add(new CrossingModel());


            return View("Employees_add", pWTEmployeeFamilyModel);
        }

        //[HttpGet]
        //public IActionResult Count()
        //{

        //    int EmployeeCount = DB.EmployeeRepository.Get().Where(x => x.IsAttended.Equals(false) && (x.PersonWithType.Crossing.Where(x => (x.InputOrOutput == false) && (x.Permanent == true)).FirstOrDefault() == null)).Count();
        //int familyCount=
        //}

        [HttpPost]
        public IActionResult Family()
        {
            return View();
        }

        public IActionResult Family(string family)
        {

            var employemodel = EmployeeMapper.Map(DB.EmployeeRepository.FindById(Convert.ToInt32(family)));
            return View(employemodel);
        }





        [HttpPost]
        public IActionResult Add(PWTModel PTWemployeeFamilyModel)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //var user = await _userManager.FindByIdAsync(userId);
            Employee employee = new Employee();
            employee = EmployeeMapper.Map(PTWemployeeFamilyModel.Employee, employee);
            // employee.Creator = DB.UserRepository.FindById(Convert.ToInt32(userId));
            DB.EmployeeRepository.Add(employee);

            PersonWithType person = new PersonWithType();

            // person = _mapper.Map<PersonWithType>(PTWemployeeFamilyModel);
            person = PersonWithTypeMapper.Map(PTWemployeeFamilyModel, person);
            person.PersonId = employee.Id;


            person.PerssonTypeId = PersonTypeEnum.Employee;
            //person.Creator = employee.Creator;
            DB.PersonWithTypeRepository.Add(person);
            return View("Employees");
        }





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








        [HttpPost]
        public async Task<IActionResult> AddCollectData(string data, string isReception)
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


                    employee.CreationDate = row.CreationDate;
                    employee.IsAttended = row.IsAttended;
                    employee.IsGuestInviter = false;
                    if(isReception == "true")
                    {
                        employee.IsReception = true;
                        crossing.InputOrOutput = null;
                        crossing.Permanent = null;
                    }

                    try
                    {
                        employee.ChildCount = Int32.Parse(row.ChildCount);
                    }
                    catch (Exception ex) { }


                    employee.IdCardInformation = new IdCardInformationModel();
                    employee.IdCardInformation = JsonModeltoIdcardInformationModel(row, employee.IdCardInformation);



                }
                else if (row.PersonType == 2) //2- family code
                {
                    if (a == 0) { employee.Family = new List<FamilyModel>(); }
                    FamilyModel familymodel = new FamilyModel();
                    PWTModel pWTEmployeeFamilyModel = new PWTModel();
                    pWTEmployeeFamilyModel.PersonTypeId = row.PersonType;
                    familymodel.PersonWithType = new PWTModel();


                    pWTEmployeeFamilyModel.Crossing = new List<CrossingModel>();
                    CrossingModel crossing = new CrossingModel();
                    crossing.CrossingTime = row.CrossingTime;
                    crossing.CarNumber = row.CarNumber;
                    crossing.Permanent = true;
                    crossing.InputOrOutput = true;
                    crossing.Creator = user;
                    crossing.Note = row.Note;
                    pWTEmployeeFamilyModel.Crossing.Add(crossing);
                    if (row.RelativeTypeOther != "" && row.RelativeTypeOther != null) {
                        familymodel.RelativeType = row.RelativeTypeOther;
                    }else
                    {
                        familymodel.RelativeType = row.RelativeType;
                    }
                    // familymodel.CreationDate = row.CreationDate;
                    familymodel.IsReception = false;


                    if (isReception == "true")
                    {
                        familymodel.IsReception = true;
                        crossing.InputOrOutput = null;
                        crossing.Permanent = null;
                    }

                    familymodel.IdCardInformation = new IdCardInformationModel();
                    familymodel.IdCardInformation = JsonModeltoIdcardInformationModel(row, familymodel.IdCardInformation);

                    familymodel.PersonWithType = pWTEmployeeFamilyModel;
                    employee.Family.Add(familymodel);


                    //pWTEmployeeFamilyModelList.Add(pWTEmployeeFamilyModel);

                    a++;
                }

            }



            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            Employee employeeEntity = new Employee();
            employeeEntity = EmployeeMapper.Map(employee, employeeEntity);
            // employeeEntity.PersonWithType.Crossing[0].Creator = DB.UserRepository.FindById(Convert.ToInt32(userId));
            DB.EmployeeRepository.Add(employeeEntity); //error occures here


            // employeeEntity.PersonWithType = new PersonWithType();
            employeeEntity.PersonWithType.PersonId = employeeEntity.Id;
            if (employeeEntity.FamilyList != null)
            {
                for (int j = 0; j < employeeEntity.FamilyList.Count; j++)
                {
                    //employeeEntity.Family[j].PersonWithType = new PersonWithType();
                    employeeEntity.FamilyList[j].PersonWithType.PersonId = employeeEntity.FamilyList[j].Id;
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








        public async Task<IActionResult> EnteranceFromReception(string MemberId, string FamilyMemberId, string MemberType)
        
        {
            int emid = Convert.ToInt32(MemberId);
            var employee = DB.EmployeeRepository.FindById(emid);
            Crossing Crossing = new Crossing(); ;
            if (MemberType == "1")
            {
                employee.PersonWithType.Crossing.FirstOrDefault().InputOrOutput = true;
                employee.PersonWithType.Crossing.FirstOrDefault().Permanent = true;
                employee.PersonWithType.Crossing.FirstOrDefault().CrossingTime = DateTime.Now;
            }
            else
            {
                int famid=Convert.ToInt32(FamilyMemberId);

                employee.FamilyList.Where(x => x.Id == famid).FirstOrDefault().PersonWithType.Crossing.FirstOrDefault().InputOrOutput = true;
                employee.FamilyList.Where(x => x.Id == famid).FirstOrDefault().PersonWithType.Crossing.FirstOrDefault().Permanent = true;
                employee.FamilyList.Where(x => x.Id == famid).FirstOrDefault().PersonWithType.Crossing.FirstOrDefault().CrossingTime = DateTime.Now;
            }
            DB.EmployeeRepository.Update(employee);
            return RedirectToAction("Employees");
            //return Json("OK");
        }

    }
}
