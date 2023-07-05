var timers = {
    Fish: 15,
    Meat: 60,
    tfish: 90,
    kraken: 120
    
  };
  var countdownInterval;
  var countupInterval;
  var timerValue = 0;
  
  function startCountdown(id) {
    var timer = timers[id];
    var tip;
  
    if (id === 'Fish') {
      tip = "Wait for the eyes to turn completely white";
    } else {
      tip = "Wait for the entire piece to turn brown. No pink should be visible";
    }
  
    var name;
  
    if (id === 'tfish') {
      name = "Trophy Fish";
    } else if (id === 'kraken') {
      name = "Kraken / Megalodon";
    } else {
      name = id.charAt(0).toUpperCase() + id.slice(1);
    }
  
    document.getElementById('info').innerText = "Your " + name + " will be ready in:";
    document.getElementById('timer').innerText = timer;
    document.getElementById('info2').innerText = "[Tip]: " + tip;
  
    timer--;
  
    var elementsToBlur = document.getElementsByClassName('blur-effect');
    for (var i = 0; i < elementsToBlur.length; i++) {
      elementsToBlur[i].classList.add('blur-effect');
    }
    document.getElementById('timer').classList.remove('blur-effect');
  
    countdownInterval = setInterval(function() {
      if (timer === 9) {
        playSound();
      }
      if (timer === 0) {
        clearInterval(countdownInterval);
        startCountup();
        document.getElementById('info').innerText = "Quick take your " + name + " before it burns! \n You've got:";
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
        document.getElementById('timer').innerText = "Burned :C";
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
  
      if (id === 'tfish') {
        startCountdown('tfish');
        document.getElementById('info').innerText = "Your Trophy Fish will be ready in:";
      } else if (id === 'kraken') {
        startCountdown('kraken');
        document.getElementById('info').innerText = "Your Kraken & Megalodon will be ready in:";
      } else {
        startCountdown(id);
        document.getElementById('info').innerText = "Your " + id + " will be ready in:";
      }
    });
  }
  
  document.getElementById('close').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
    clearInterval(countdownInterval);
    clearInterval(countupInterval);
    timerValue = 0;
  });
  