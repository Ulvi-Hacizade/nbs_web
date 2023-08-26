//Materialize JS Initialization
M.AutoInit();
//Sidenav Initialization


const options = {

  i18n: {
    months: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "İyun",
      "İyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr"
    ],
    monthsShort: [
      'Yan',
      'Fev',
      'Mar',
      'Apr',
      'May',
      'İyn',
      'İyl',
      'Avq',
      'Sen',
      'Okt',
      'Noy',
      'Dek'
    ],

    weekdays: [
      'Bazar',
      'Bazar ertəsi',
      'Çərşənbə axşamı',
      'Çərşənbə',
      'Cümə axşamı',
      'Cümə',
      'Şənbə'
    ],

    weekdaysShort: [
      'Baz',
      'Baz.er',
      'Çər.ax',
      'Çər',
      'Cüm.ax',
      'Cüm',
      'Şən'
    ]
  }
}

document.addEventListener('DOMContentLoaded', function() {
    var sidenavs = document.querySelectorAll('.sidenav');
    var datepickers = document.querySelectorAll('.datepicker');
    if (sidenavs.length) {
        var sidenavInstances = M.Sidenav.init(sidenavs, options);
    }
    if (datepickers.length) {
        var datepickerInstances = M.Datepicker.init(datepickers, options);
    }

    $(document).ready(function () {
        $('.tabs').tabs();
    });
    //var elems = document.querySelectorAll('.datepicker');
    //if(elems.length) {
    //  var instances = M.Datepicker.init(elems, options);
    //}
});



//console.log($('.myPicker'));

//$(document).ready(function () {
//    if ($('.myPicker').length) {
//        $('.myPicker').dateTimePicker({
//            selectData: "now",
//            positionShift: { top: 20, left: 0 },
//            title: "Vaxtı seçin",
//            buttonTitle: "Seçildi",
//            dateFormat: "MM-DD-YYYY HH:mm",
//            locale: 'az'
//        });
//    }
    
//})



$(document).ready(function () {
    if ($('label[for="entrance_date"]').length) {
        $('label[for="entrance_date"]')[0].classList.add('active');
    }
});

 
