console.log('NO PACK')

let tInterval = setInterval(timer, 1000);
let t = 5
let timerTxt = document.querySelector('#timerTxt');

function timer() {
    if (t > 0) {
        t--
        timerTxt.textContent = `You should be back in your dashboard in ${t} seconds.`
    } else {
        stopTimer();
    }
}

function stopTimer() {
    clearInterval(tInterval);
}


setTimeout(function() {
    window.location.pathname = "/dashboard/";
}, 5000)