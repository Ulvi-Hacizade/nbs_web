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
    public class WorkerController : ControllerBase
    {
        [HttpGet]
        public IActionResult WorkerParent()
        {
            var Workers = DB.WorkerRepository.Get().Where(x=>x.PersonWithType.Crossing.Where(x => (x.InputOrOutput == false) && (x.Permanent == true)).FirstOrDefault() == null).ToList();
            List<WorkerModel> WorkerModelList = new List<WorkerModel>();

            foreach (var workerItem in Workers)
            {
                WorkerModel worker = new WorkerModel();
                worker = WorkerMapper.Map(workerItem);
                worker.WorkerParentModel = new WorkerParentModel();
                worker.WorkerParentModel = WorkerParentMapper.Map(workerItem.WorkerParent);
                WorkerModelList.Add(worker);
            }

            ViewData["EmployeeCount"] = WorkerModelList.Count;
            ViewData["Category"] = "vətəndaş";
            return View("Worker", WorkerModelList);

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


        [HttpGet]
        public IActionResult Add()
        {
            PWTModel pWTEmployeeFamilyModel = new PWTModel();

            pWTEmployeeFamilyModel.Crossing = new List<CrossingModel>();
            pWTEmployeeFamilyModel.Crossing.Add(new CrossingModel());


            return View("Worker_add", pWTEmployeeFamilyModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddCollectData(string data)
        {

            WorkerParentModel workerParent = new WorkerParentModel();
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
                if (row.PersonType == PersonTypeEnum.WorkerParent) //1-emekdasin kodu
                {

                    
                    workerParent.Note = row.Note;


                }
                else if (row.PersonType == 4) //worker code 4
                {
                    if (a == 0) { workerParent.WorkerModelList = new List<WorkerModel>(); }
                    WorkerModel workermodel = new WorkerModel();
                    PWTModel pWTEmployeeFamilyModel = new PWTModel();
                    pWTEmployeeFamilyModel.PersonTypeId = row.PersonType;
                    workermodel.PersonWithtype = new PWTModel();
                   

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
                    workermodel.IdCardInformation = new IdCardInformationModel();
                    workermodel.IdCardInformation = JsonModeltoIdcardInformationModel(row, workermodel.IdCardInformation);

                    workermodel.PersonWithtype = pWTEmployeeFamilyModel;
                    workerParent.WorkerModelList.Add(workermodel);


                    //pWTEmployeeFamilyModelList.Add(pWTEmployeeFamilyModel);

                    a++;
                }

            }



            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            WorkerParent workerParentEntity = new WorkerParent();
            workerParentEntity = WorkerParentMapper.Map(workerParent, workerParentEntity);
            // employeeEntity.PersonWithType.Crossing[0].Creator = DB.UserRepository.FindById(Convert.ToInt32(userId));
            DB.WorkerParentRepository.Add(workerParentEntity);


            // employeeEntity.PersonWithType = new PersonWithType();
           // workerParentEntity.PersonWithType.PersonId = workerParentEntity.Id;
            if (workerParentEntity.WorkerList != null)
            {
                for (int j = 0; j < workerParentEntity.WorkerList.Count; j++)
                {
                    //employeeEntity.Family[j].PersonWithType = new PersonWithType();
                    workerParentEntity.WorkerList[j].PersonWithType.PersonId = workerParentEntity.WorkerList[j].Id;
                }
            }
            //Employee employeeEntityup = new Employee();
            //  employeeEntityup = EmployeeMapper.Map(employee, employeeEntity);
            DB.WorkerParentRepository.Update(workerParentEntity);

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

        public IActionResult GroupPermenantQuitAll(string MemberId, string type)
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
            var workerParent = DB.WorkerParentRepository.FindById(id);


            foreach (var workermember in workerParent.WorkerList)
            {
                var PermenanExit = workermember.PersonWithType.Crossing.Where(x => x.InputOrOutput == false && x.Permanent == true).FirstOrDefault();
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
                    output.PersonWithType = workermember.PersonWithType;
                    workermember.PersonWithType.Crossing.Add(output);
                }
            }
            DB.WorkerParentRepository.Update(workerParent);

       

            return RedirectToAction("WorkerParent");
        }

        public IActionResult WorkerGroup(string workerParentId)
        {

            var workerparentModel =WorkerParentMapper.Map(DB.WorkerParentRepository.FindById(Convert.ToInt32(workerParentId)));
            return View(workerparentModel);
        }

        public IActionResult WorkerMembertemporaryExitOrEnter(string workerID, string inputOutput,string note, string time)
        {
            int workerid = Convert.ToInt32(workerID);
            var worker = DB.WorkerRepository.FindById(workerid);


            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = DB.UserRepository.FindById(Convert.ToInt32(userId));

            
                    Crossing output = new Crossing();
                    //output.CarNumber = cro.CarNumber;
                    output.CrossingTime = DateTime.Now;

                if (time != null) { 
                output.CrossingTime = Convert.ToDateTime(time);

                }
            if (note != null) { output.Note = note; }

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
                    output.PersonWithType = worker.PersonWithType;
                    worker.PersonWithType.Crossing.Add(output);
            
            DB.WorkerRepository.Update(worker);

            //return RedirectToAction("WorkerParent");
            return Json("OK");

            //return Redirect("Employees");

        }

        public IActionResult WorkerMemberpermenantExit(string workerID, string note, string time)
        {
            int workerid = Convert.ToInt32(workerID);
            var worker = DB.WorkerRepository.FindById(workerid);

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

            if (note != null) { output.Note = note; }
            output.InputOrOutput = false;


                    output.Permanent = true;
                    output.Creator = user;

                    //output.Note
                    output.PersonWithType = worker.PersonWithType;
                    worker.PersonWithType.Crossing.Add(output);

              
            DB.WorkerRepository.Update(worker);

            return Json("OK");
        }

       
    }
}
