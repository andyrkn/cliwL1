order = [];
rid = 0;
seconds = 5;

var intv;

function reset() {
    for (let i = 1; i <= 9; i++) {
        let name = 'bt' + i;
        document.getElementById(name).style.backgroundColor = 'yellow';
    }
    rid = 0;
    order = [];
}
function start() {
    //prep
    for (let i = 1; i <= 9; i++) {
        let name = 'bt' + i;
        document.getElementById(name).style.backgroundColor = 'yellow';
    }
    seconds = 6;
    rid = 0;
    order = [];
    order.push(Math.floor((Math.random() * 9) + 1));
    order.push(Math.floor((Math.random() * 9) + 1));
    console.log('new game start ' + order.toString());


    //begin
    document.getElementById('bt' + order[0]).style.backgroundColor = 'red';
    setTimeout(df, 1000);
}

function df() {
    document.getElementById('bt' + order[0]).style.backgroundColor = 'yellow';
    document.getElementById('bt' + order[1]).style.backgroundColor = 'red';
    setTimeout(ds, 1000);
}

function ds() {
    document.getElementById('bt' + order[1]).style.backgroundColor = 'yellow';
    countdown();
}

function c1(b) {
    document.getElementById(b.id).style.backgroundColor = 'green';
    addelement(b.id);
}

function addelement(bid) {
    str = bid.substring(bid.length - 1, bid.length);
    if (order[rid] == str) {
        console.log(str + ' click correct');
        if (rid == 1) {
            alert('you win'); reset();
            clearInterval(intv); return;
        }

        rid = Number(rid) + 1;
    } else {
        alert('wrong');
        clearInterval(intv);
        reset();
    }
}
exception = 0;
function pause() {
    exception = 1;
    for (let i = 1; i <= 9; i++) {
        let name = 'bt' + i;
        document.getElementById(name).style.pointerEvents = 'none';
    }
}

function resume() {
    exception = 0;
    for (let i = 1; i <= 9; i++) {
        let name = 'bt' + i;
        document.getElementById(name).style.pointerEvents = 'all';
    }
}

function countdown() {
    intv = setInterval(function () {
        if (Number(seconds) == 0) {
            clearInterval(intv);
            alert('defeat');
            reset();
        }
        seconds = Number(seconds) - 1 + Number(exception);
        document.getElementById('htime').innerHTML = seconds;
    }, 1000);
}
