const timers = {
  BFish: { timer1: 10, timer2: 12 },
    // [Down here is normal fish timers] BFish: { timer1: 45, timer2: 35 },
  BMeat: { timer1: 65, timer2: 55 },
  BTFish: { timer1: 95, timer2: 85 },
  BMonsterM: { timer1: 125, timer2: 115 }
};

  let countdownInterval;
  let phase = 1;
  
  function startCountdown(id) {
    let timer = timers[id].timer1;
  
    if (phase === 1) {
      timer = timers[id].timer1;
    } else if (phase === 2) {
      timer = timers[id].timer2;
    }
  
    let tip;
  
    if (id === 'BFish' || id === 'BTFish') {
      tip = "Wait for the eyes to turn completely white";
    } else {
      tip = "Wait for the entire piece to turn brown. No pink should be visible";
    }
  
    let name;
  
    if (id === 'BTFish') {
      name = "Trophy Fish";
    } else if (id === 'BMonsterM') {
      name = "Kraken / Megalodon";
    } else if (id === "BMeat"){
      name = "Basic Meat";
    }else if (id === "BFish"){
      name = "Fish";
    }
  
    const infoElement = document.getElementById('info');
    const timerElement = document.getElementById('timer');
    const info2Element = document.getElementById('info2');
  
    infoElement.innerText = `Your ${name} will be ready in:`;
    timerElement.innerText = timer;
    info2Element.innerText = `[Tip]: ${tip}`;
    timer--;
  
    countdownInterval = setInterval(() => {
      if (timer === 9 && phase === 1) {
        playSound1();
      } else if (timer === 9 && phase === 2) {
        playSound2();
      }
  
      if (timer === 0) {
        clearInterval(countdownInterval);
        phase++;
  
        if (phase === 3) {
          infoElement.innerText = `Your ${name} has burned!\n\n`;
          timerElement.style.display = 'none';
          info2Element.innerText = "";
          phase = 1;
        } else if (phase === 2) {
          timer = timers[id].timer2;
          startCountdown(id);
          infoElement.innerText = `Quick take your ${name} before it burns! \n You've got:`;
          timerElement.style.display = 'inline';
          info2Element.innerText = "";
        }
      }
  
      timerElement.innerText = timer;
      timer--;
    }, 1000);
  }
  
  const audio1 = new Audio('END-ALARM-1.mp3');
  const audio2 = new Audio('END-ALARM-2.mp3');
  
  function playSound1() {
    audio1.play();
  }
  
  function playSound2() {
    audio2.play();
  }
  
  function stopSound() {
    audio1.pause();
    audio1.currentTime = 0;
    audio2.pause();
    audio2.currentTime = 0;
  }
  

  const buttons = document.querySelectorAll("nav button")
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      const id = this.id;
      document.getElementById('modal').style.display = 'flex';
      startCountdown(id);
    });
  }
  
  document.getElementById('close').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
    stopSound();
    phase = 1;
    document.getElementById('timer').style.display = 'inline';
    clearInterval(countdownInterval);
  });
  