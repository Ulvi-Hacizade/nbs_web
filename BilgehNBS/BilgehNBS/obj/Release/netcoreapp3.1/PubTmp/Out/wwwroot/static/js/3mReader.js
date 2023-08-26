if ('serial' in navigator) {
    const notSupported = document.getElementById('notSupported');
    notSupported.classList.add('hidden');
}

const log = document.getElementById("log");
const log2 = document.getElementById("log2");
const error = document.getElementById('error');




async function connect() {
    document.getElementById("connect").style = "pointer-events: none;";

    const filters = [
        { usbVendorId: 0x0898, usbProductId: 0x0064 }
    ];
    try {
        port = await navigator.serial.requestPort();
    } catch (e) {
        error.textContent = e.message
        document.getElementById("connect").style = "pointer-events: all;" 
        return;
    }

    // - Wait for the port to open.
    await port.open({ baudRate: 9600 });
    console.log('Open');


    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;

    reader = inputStream.getReader();

    readLoop();
}

async function readLoop() {
    console.log('Readloop');


    while (port.readable) {
        let str = null;
        const { value, done } = await reader.read();
        if (value) {
            log.textContent += value;
        }
        if (done) {
            reader.releaseLock();
            break;
        }

        if (log.innerText.length === 99 || log.innerText.length === 101) {
            log2.textContent = log.textContent;
            log.textContent = null;
        } else {
            log2.textContent = null;
        }

    }

}
let newFin = null;
let oldFin = null;
let myVar;

function myStartFunction() {
    console.log('done');
    myVar = setInterval(function () {
        alertFunc(log2.innerText);
    },100);
}

function callService(newFin) {
    if (newFin != null && newFin.length == 7 && oldFin !== newFin) {
        getDataViaPin(newFin);
        oldFin = newFin;
    }
    //myStopFunction();
}

function alertFunc(innerText) {
    len = innerText.length;
    str = clean(innerText);
    if (len === 101 || len === 99) {
        if (len === 99) {
            if (str !== '') {
                //console.log(get_surname(str, 1));
                //console.log(get_name(str, 1));
                //console.log(get_serial_number(str, 1));
                //console.log(date_converter(get_birth(str, 1)));
                //console.log(date_converter(get_expire_date(str, 1), true));
                //console.log(get_fin(str, 1));
                newFin = get_fin(str, 1);
                if (newFin.length == 7) {
                    callService(newFin);
                }
                console.log(newFin);

                /*console.log(get_gender(str, 1));*/
            }
        } else if (len === 101) {
            //console.log(get_serial_number(str, 2));
            newFin = get_fin(str, 2);
            if (newFin.length == 7) {
                callService(newFin);
            }
            console.log(newFin);
            //console.log(get_fin(str, 2));
            //console.log(date_converter(get_birth(str, 2)));
            //console.log(get_gender(str, 2));
            //console.log(date_converter(get_expire_date(str, 2), true));
            //console.log(get_name(str, 2));
            //console.log(get_surname(str, 2));
        }
    } else {
        log.textContent = null;
    }


}

myStartFunction();

function myStopFunction() {
    clearInterval(myVar);
}

function clean(str) {

    newstr = str.replace('`OU0 ', "");
    newstr = str.replace('bOU0', "");
    newstr = newstr.replace('', "");

    return newstr;
}

function get_surname(str, type = 1) {
    if (type === 1) {
        str = str.substr(13);
        return str.split('<<')[0];
    }

    if (typeof str !== 'undefined') {
        str = str.split(' ')[2];
        return str.split('<<')[0];

    }

}

function get_name(str, type = 1) {
    if (type === 1) {
        return str.split('<<')[1];
    }
    if (typeof str !== 'undefined') {
        str = str.split(' ')[2];
        return str.split('<<')[1]

    }
}

function get_serial_number(str, type = 1) {
    if (type === 1) {
        str = str.split('________ ')[1];
        return 'AZE' + str.split('<')[0];
    }

    if (typeof str !== 'undefined') {
        return str.substring(12, 21);
    }
}

function get_birth(str, type = 1) {
    if (type === 1) {
        str = str.split('AZE')[2];
        if (typeof str !== 'undefined') {
            return str.substring(0, 6);
        }
    }

    if (typeof str !== 'undefined') {
        str = str.split(' ')[1];
        return str.substring(0, 6);
    }
}

function get_expire_date(str, type = 1) {
    if (type === 1) {
        str = str.substr(str.length - 24);
        return str.substring(0, 6);
    }
    if (typeof str !== 'undefined') {
        str = str.split(' ')[1];
        return str.substr(8, 6);
    }
}

function get_fin(str, type = 1) {
    if (type === 1) {
        str = str.substr(str.length - 17);
        return str.substring(0, 7);
    }
    if (typeof str !== 'undefined') {
        return str.substring(22, 29);
    }
}

function get_gender(str, type = 1) {
    if (type === 1) {
        str = str.substr(str.length - 25);
        return str.substring(0, 1);
    }
    if (typeof str !== 'undefined') {
        str = str.split(' ')[1];
        return str.substr(7, 1);
    }
}

function date_converter(input, is_expired = false) {
    begin = '19';
    if (is_expired)
        begin = '20';

    let date = '';
    if (input !== '<<<<<<' && typeof input !== 'undefined')
        date = new Date(begin + input.substr(0, 2), input.substr(2, 2) - 1, input.substr(4, 2));
    return date;
}


