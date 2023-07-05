var timers = {
    // fish: 40,
    fish: 15,
    tfish: 90,
    kraken: 120,
    chicken: 60
};
var countdownInterval;
var countupInterval;
var timerValue = 0;

function startCountdown(id) {
    var timer = timers[id];
    var tip;

    if (id === 'fish') {
        tip = "Wait for the eyes to turn completely white";
    } else {
        tip = "Wait for the entire piece to turn brown. No pink should be visible";
    }

    document.getElementById('info').innerText = "Your " + id + " will be ready in:";
    document.getElementById('timer').innerText = timer;
    document.getElementById('info2').innerText = "[Tip]: " + tip; 
   
    timer--;

    countdownInterval = setInterval(function() {
        if (timer === 9){
            playSound();
        }
        if (timer === 0) {
            clearInterval(countdownInterval);
            startCountup();
            document.getElementById('info').innerText ="Quick take your "+id+" before it will burn! \n You got :";
            document.getElementById('info2').innerText = "";
        }

        document.getElementById('timer').innerText = timer;
        timer--;
    }, 1000);
}

function startCountup() {
    countupInterval = setInterval(function() {
        timerValue++;

        if (timerValue === 40) {
            clearInterval(countupInterval);
            document.getElementById('timer').innerText = "Burned :C ";
        } else {
            document.getElementById('timer').innerText = timerValue;
        }
    }, 1000);
}

function playSound() {
  var audio = new Audio('alarm_sound.mp3');
  audio.play();
}

var buttons = document.getElementsByClassName('button');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        var id = this.id;
        document.getElementById('modal').style.display = 'flex';
        startCountdown(id);
    });
}

document.getElementById('close').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
    clearInterval(countdownInterval);
    clearInterval(countupInterval);
    timerValue = 0;
});
