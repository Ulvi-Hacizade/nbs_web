////var collectedArrData = [];
////var collectedArrDataDB = [];
////const collectDataTable = document.getElementById('collect_data_table');
////const collectDataTableBody = document.getElementById('collect_data_table_body');
////const addCollectBtn = document.getElementById('addCollectedData');

////function addDataToTable() {
////    collectDataTableBody.innerHTML = "";
////    collectedArrData.forEach(function (person, index) {
////        collectDataTableBody.innerHTML += `
////            <td> ${index + 1} </td>
////            <td> <img src="${person.image}"  width="50"  /> </td>
////            <td> ${person.name} </td>
////            <td> ${person.surname} </td>
////    `;
////    });
////}


////function addDataToCollectedArr(tableData, allData) {
////    collectedArrData.push(tableData);
////    collectedArrDataDB.push(allData);

////    console.log(allData)
////    addDataToTable();
////}

////addCollectBtn.addEventListener('click', addCollectDataToDB);

////function addCollectDataToDB() {

////    if (collectedArrData.length && collectedArrDataDB.length && collectedArrData.length == collectedArrDataDB.length) {

////        let mapppedCollectData = collectedArrDataDB.map(function (item, index) {

////            return {
////                IdCardInformationId: 0,
////                HeadInstitutionId: 1,
////                ActivationDate: item.activationDate,
////                Status: item.status,
////                GivenDate: item.givenDate,
////                UserId: null,
////                CreateDate: null,
////                ExpireDate: item.expireDate,
////                BirthDate: item.birthDate,
////                BirthAddress: item.birthAddress.city,
////                Pin: item.pin,
////                BloodType: item.bloodType.description,
////                Surname: item.surnameAz,
////                PassportNumber: item.number,
////                Patronymic: item.patronymicAz,
////                RegistrationAddress: item.iamasAddress.fullAddress,
////                DeActivationReason: item.deactivationReason,
////                Name: item.nameAz,
////                MaritalStatus: item.maritalStatus.description,
////                Gender: item.gender.description,
////                GivenOrganizatoin: item.givenOrganization,
////                UserId: null,
////                Height: item.height,
////                EyeColor: item.eyeColor.description,
////                Image: "user.jpg",
////                IsRegistration: true,
////                Citizenship: item.citizenship.name,
////                RegistrationType: "İkinci Mərtəbə",
////                InvitingEmployee: $('#InvitingEmployee').val(),
////                Note: $('#Note').val(),
////            }
////        });

////        let serializedData = JSON.stringify(mapppedCollectData)
////        callAddCollectService(serializedData)
////            .then(data => {
////                console.log(data);
////            })
////            .catch(err => console.log(err));
////    }
////}

////function callAddCollectService(collectData) {
////    return new Promise((resolve, reject) => {
////        $.post('/Operator/AddSecondFloorMany', { data: collectData }, function (response) {
////            resolve(response)
////        }).fail(err => reject(err));
////    })
////}





////function getCurrentDateFormatted(today) {
////    const yyyy = today.getFullYear();
////    let mm = today.getMonth() + 1; // Months start at 0!
////    let dd = today.getDate();

////    if (dd < 10) dd = '0' + dd;
////    if (mm < 10) mm = '0' + mm;

////    const formattedToday = dd + '/' + mm + '/' + yyyy;

////    return formattedToday;
////}



let collectedDataArr = [];
let collectedDataTableBody = $("#collectedDataTable tbody");


function resetCollectDataTable() {
    collectedDataArr = [];
    collectedDataTableBody.html("");
}

$('#relationType').on("change", function () {
    if ($(this).val() == "0") {
        console.log('done')
        $("#otherRelationType-field").css({ "display": "block" });
    }
})

//$('#otherRelationType').on('input', function (e) {
//    $('#relationType').val(e.target.value);
//})

$('#otherRelationType_add').click(function (e) {
    e.preventDefault();
    alert('clicked')

    let newValue = $('#otherRelationType').val();
    var $newOpt = $("<option>").attr("value", newValue).text(newValue)
    $('#relationType').append($newOpt);
    $("#relationType").trigger('contentChanged');
})

//addDataToTable 
function addDataToTable(data) {
    let html = "";
    if (!data?.length) {
        alert("Zəhmət olmasa məlumat daxil edin!");
        return;
    }

    console.log('dataaaaa', data);

    data.forEach(function (item, index) {
        html += `
            <tr>
                <td>${ index + 1}</td>
                <td><img src = "${ item.Image }" width = "50"/></td>
                <td>${ item.name }</td>
                <td>${ item.surName }</td>
                <td>${ item.fatherName }</td>
                <td>${ item.personType == 1 ? "Bəli" : "Xeyr" }</td>
            </tr>
        `
    });


    $("#small_aged-field").css({ "display": "none" });
    $(".withEmployee-field").css({ "display": "none" });

    if (!html) {
        alert('Məlumat yoxdur!');
        return;
    }

    collectedDataTableBody.html(html);
}

//addDataToCollectedArr
function addDataToCollectedArr(data) {
    collectedDataArr.push(data);
}

//serializeData
function serializeData(data) {
    return JSON.stringify(data);
}

//sendCollectDataToService
function sendCollectDataToService(collectData, url) {
    return new Promise((resolve, reject) => {
        $.post(url, { data: collectData }, function (response) {
            resolve(response)
        }).fail(err => reject(err));
    })
}


//resetForm 
function resetForm(form) {
    form.trigger('reset');
    document.getElementById('memberPhoto').src = "/static/img/demo_user.webp";
};


//getFieldValues
function getFieldsValues(personType, isWorkerGroup) {

    let Image = $('#memberPhoto').attr('src');
    let name = $('#first_name').val();
    let surName = $('#last_name').val();
    let fatherName = $('#father_name').val();
    let passportNumber = $('#passport_number').val();
    let birthAddress = $('#birth_address').val();
    let birthDate = $('#birth_date').val();
    let registrationAddress = $('#registration_address').val();
    let givenOrganisation = $('#given_organisation').val();
    let carNumber = $('#car_number').val();
    let maritalStatus = $('#marital_status').val();
    let bloodType = $('#blood_type').val();
    let height = $('#height').val();
    let eyeColor = $('#eye_color').val();
    let givenDate = $('#given_date').val();
    let expireDate = $('#expire_date').val();
    let pin = $('#pin').val();
    let activationDate = $('#activation_date').val();
    let deactivationDate = $('#deactivation_date').val();
    let crossingTime = $('#entrance_date').val();
    let Note = $('#note').val();
    let RelativeTypeOther = $('#relativeTypeOther').val();
    if (isWorkerGroup) {
        Note = $('#workerGroupNote').val();
    }
    let ChildCount = $('#small_aged').val();
    let IsDriver = $('#isDriver').is(':checked');
    let IsAttended = $('#withEmployee').is(':checked');
    let RelativeType = $('#relativeType').val();

    crossingTime = crossingTime == "" ? moment(new Date(Date.now())).format('MM-DD-YYYY HH:mm') : crossingTime;

    return {
        Image,
        name,
        surName,
        fatherName,
        passportNumber,
        birthAddress,
        birthDate,
        registrationAddress,
        givenOrganisation,
        carNumber,
        maritalStatus,
        bloodType,
        height,
        eyeColor,
        givenDate,
        expireDate,
        pin,
        activationDate,
        deactivationDate,
        crossingTime,
        Note,
        ChildCount,
        IsDriver,
        IsAttended,
        personType,
        RelativeType,
        RelativeTypeOther
    }
}

 //public int PersonType { get; set; }
 //       //public int IdEmFa { get; set; }
 //       public string ChildCount { get; set; }
 //       public DateTime CreationDate { get; set; }
 //       public bool EventParticipants { get; set; }
 //       public bool IsDriver { get; set; } = new bool();
 //       public bool IsAttended { get; set; }
 //       public string Note { get; set; }

 //       //id information
 //       public int IdCardId { get; set; }
 //       public string Name { get; set; }
 //       public string Surname { get; set; }
 //       public string FatherName { get; set; }
 //       public string Patronymic { get; set; }
 //       public string PassportNumber { get; set; }
 //       public string BirthAddress { get; set; }
 //       public string BirthDate { get; set; }
 //       public string RegistrationAddress { get; set; }
 //       public string GivenOrganizatoin { get; set; }
 //       public string MaritalStatus { get; set; }
 //       public string BloodType { get; set; }
 //       public string Height { get; set; }
 //       public string EyeColor { get; set; }
 //       public string GivenDate { get; set; }
 //       public string ExpireDate { get; set; }
 //       public string Pin { get; set; }
 //       public string ActivationDate { get; set; }
 //       public string DeActivationReason { get; set; }
 //       public string Status { get; set; }
 //       public string Image { get; set; }
 //       public string Gender { get; set; }
 //       //crossing
 //       public int Id { get; set; }
 //       public DateTime CrossingTime { get; set; }

 //       //0 -output, 1-input
 //       public bool InputOrOutput { get; set; }

 //       //public PersonWithType PersonWithType { get; set; }

 //       public string CarNumber { get; set; }
 //       //family
 //       public string RelativeType { get; set; }

