$(document).ready(function () {
    const mrzReaderBtn = document.getElementById('mrzreader');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let video = document.getElementById('video');
    let videoContainer = document.getElementsByClassName('video-containerr');
    let formPreloader = document.getElementsByClassName('form-preloader');
    let mobileSidebar = document.getElementById('sidebar');
    let idCardBlock = document.getElementById('idCardBlock');


    //-----------------------
    let searchName = $('#search_name');
    let searchSurname = $('#search_surname');
    let searchPatr = $('#search_patr');
    let photo = $('#memberPhoto');
    let name = $('#first_name');
    let surName = $('#last_name');
    let fatherName = $('#father_name');
    let passportNumber = $('#passport_number');
    let birthAddress = $('#birth_address');
    let birthDate = $('#birth_date');
    let registrationAddress = $('#registration_address');
    let givenOrganisation = $('#given_organisation');
    let maritalStatus = $('#marital_status');
    let bloodType = $('#blood_type');
    let height = $('#height');
    let eyeColor = $('#eye_color');
    let givenDate = $('#given_date');
    let expireDate = $('#expire_date');
    let pin = $('#pin');
    let activationDate = $('#activation_date');
    let deactivationReason = $('#deactivation_reason');
    let male = $('#male');
    let female = $('#female');
    //--------------------------------------------------------------

    if (mrzReaderBtn) {
        mrzReaderBtn.addEventListener('click', function () {
            readMrz();
        });
    }


    function readMrz() {
        videoDisplayStatus('block');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
                video.srcObject = stream;
                video.play();
                setTimeout(function () {
                    captureAndSendPicutre();
                }, 1300)
            }).catch(err=> console.log(err));
        } else {
            alert('Kamera yoxdur!');
        }
    }

    function videoDisplayStatus(status) {
        if (status === 'none') {
            videoContainer[0].style.display = 'none';
            video.style.display = 'none';
        } else {
            videoContainer[0].style.display = 'block';
            video.style.display = 'block';
        }
    }

    function formLoaderDisplayStatus(status) {
        if (status === 'none') {
            formPreloader[0].style.display = "none";
        } else {
            formPreloader[0].style.display = "block";
        }
    }

    function captureAndSendPicutre() {
        var ratio = video.videoWidth / video.videoHeight;
        w = video.videoWidth - 100;
        h = parseInt(w / ratio, 10);
        canvas.width = w;
        canvas.height = h;
        context.fillRect(0, 0, w, h);
        context.drawImage(video, 0, 0, w, h);
        let base64Url = canvas.toDataURL().split(';base64,')[1];
        let replacedUrl = "";
        if (base64Url) {
            replacedUrl = base64Url.replace('data:image/png;base64,', "");
        }
        if (replacedUrl) {
            getDataFromPinAlServie(replacedUrl)
        } else {
            captureAndSendPicutre();
        }
    }

    function getDataFromPinAlServie(replacedUrl) {
        formLoaderDisplayStatus('block');
        $.post('https://10.36.9.100:8084/fin-al', replacedUrl, function (dataFromMrzReader) {
            videoDisplayStatus('none');
            let strrr = JSON.stringify(dataFromMrzReader);
            let { fin, number } = dataFromMrzReader;
            if (number) {
                getDataFromService(number).then(data => {
                    console.log(data);
                    if (data?.data?.data?.document?.number) {
                        writeDataToForm(data);
                        formLoaderDisplayStatus('none');
                        return;
                    } else {
                        getDataFromPinAlServie(fin).then(data => {
                            if (data?.data?.data?.document?.number) {
                                writeDataToForm(data);
                                formLoaderDisplayStatus('none');
                                return;
                            } else {
                                alert('Məlumat tapılmadı yenidən cəhd ediləcək!')
                                setTimeout(function () {
                                    captureAndSendPicutre();
                                }, 1300);
                            }
                        })
                    }
                })
            } else if (fin) {
                getDataFromPinAlServie(fin).then(data => {
                    if (data?.data?.data?.document?.number) {
                        writeDataToForm(data);
                        formLoaderDisplayStatus('none');
                        return;
                    } else {
                        setTimeout(function () {
                            captureAndSendPicutre();
                        }, 1300);
                    }
                })
            } else {
                captureAndSendPicutre();
            }

            //if (dataFromMrzReader?.number) {

            //    videoDisplayStatus('none');

            //    //formLoaderDisplayStatus('block');

            //    let number = dataFromMrzReader.number;

            //    //getDataFromService(number)
            //    //    .then(dataFromSeriaService => {
            //    //        writeDataToForm(dataFromSeriaService);
            //    //        if (result) {
            //    //            formPreloader[0].classList.add('d-none');
            //    //            return;
            //    //        } else {
            //    //            if (dataFromMrzReader.fin) {
            //    //                let pin = dataFromMrzReader.fin;
            //    //                getDataViaPin(pin)
            //    //                    .then(dataFromPinService => {
            //    //                        let result = addPersonData(dataFromPinService, true);
            //    //                        if (result) {
            //    //                            formLoaderDisplayStatus('none');
            //    //                            return;
            //    //                        } else {

            //    //                            /*captureAndSendPicutre();*/
            //    //                            alert('Vəsiqə məlumatları tapılmadı!');
            //    //                            readMrz();
            //    //                            setTimeout(function () {
            //    //                                captureAndSendPicutre();
            //    //                            }, 1500);
            //    //                        }
            //    //                    })
            //    //            }
            //    //        }
            //    //    })
            //} else {
            //    captureAndSendPicutre();
            //}
        }).fail(function (err) {
            let strErr = JSON.stringify(err);
            return;
        }).done(function () {
            formLoaderDisplayStatus('none');
        })

    }

    function writeDataToForm(data) {
        if (!data?.data?.data?.document?.number) {
            alert("Melumat tapilmadi!");
            return false;
        }

        let document = data.data.data.document;
        let person = data.data.data.person;

        $('label').addClass('active');

        photo[0].src = (person.images[0].image && person.images[0].image != "data:image/jpeg;base64,") ? person.images[0].image : "/static/img/demo_user.webp";
        name.val(person.nameAz);
        surName.val(person.surnameAz);
        fatherName.val(person.patronymicAz);
        passportNumber.val(document.number);
        birthAddress.val(person.birthAddress.city);
        birthDate.val(person.birthDate);
        registrationAddress.val(person.iamasAddress.fullAddress);
        givenOrganisation.val(document.givenOrganization);
        maritalStatus.val(person.maritalStatus.description);
        bloodType.val(person.bloodType.description);
        height.val(person.height);
        eyeColor.val(person.eyeColor.description);
        givenDate.val(document.givenDate);
        expireDate.val(document.expireDate);
        pin.val(person.pin);
        activationDate.val(document.activationDate);
        deactivationReason.val(document.deactivationReason);
        person.gender.label == "MALE" ? male[0].checked = true : female[0].checked = true;
    }


    function getDataFromService(info, fromPatr) {
        let endpoint = "/Home/IdCardByPin?pin";
        if (fromPatr) {
            endpoint = `/Home/IdCardByNSP?name=${info.name}&surname=${info.surname}&patronymic=${info.patronymic}`;
        }
        return new Promise((resolve, reject) => {
            fetch(`${endpoint}${!fromPatr ? `=${info}` : ""}`)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
})
