const timers = {
  BFish: { timer1: 45, timer2: 35, itemName: "Fish", tip: "Wait for the eyes to turn completely white" },
  BMeat: { timer1: 65, timer2: 55, itemName: "Basic Meat", tip: "Wait for the entire piece to turn brown. No pink should be visible" },
  BTFish: { timer1: 95, timer2: 85, itemName: "Trophy Fish", tip: "Wait for the eyes to turn completely white" },
  BMonsterM: { timer1: 125, timer2: 115, itemName: "Kraken / Megalodon", tip: "Wait for the entire piece to turn brown. No pink should be visible" },
};

const circle = document.getElementById('circle');
const audioTick1 = new Audio("SOUND/SOUND-1.mp3");
const audioEnd1 = new Audio("SOUND/END-SOUND-1.mp3");
const audioTick2 = new Audio("SOUND/SOUND-2.mp3");
const audioEnd2 = new Audio("SOUND/END-SOUND-2.mp3");
let countdownInterval;
let phase = 1;
let timer;

function startCountdown(id) {
  circle.style.strokeDashoffset = '440';

  if (phase === 3) {
      phase = 1;
      circle.style.strokeDashoffset = '0';
      circle.style.visibility = 'visible';
      const burnedImage = document.getElementById("burnedImage");
      burnedImage.style.visibility = 'hidden';
  }

  if (phase === 1) {
      timer = timers[id].timer1;
  } else if (phase === 2) {
      timer = timers[id].timer2;
  }

  let totalDuration = timer;
  let startTime = Date.now();
  let itemName = timers[id].itemName; 
  let tip = timers[id].tip;

  const infoElement = document.getElementById("info");
  const timerElement = document.getElementById("timer");
  const info2Element = document.getElementById("info2");
  const burnedImage = document.getElementById("burnedImage");

  infoElement.innerText = `Wait for ${itemName} to get perfectly cooked ♨️`;
  timerElement.innerText = timer;
  info2Element.innerText = `[Tip] ${tip}`;

  countdownInterval = setInterval(() => {
      let elapsedTime = Date.now() - startTime;
      let remainingTime = totalDuration - Math.floor(elapsedTime / 1000);

      if (remainingTime === 8 && phase === 1) {
          playSound("tick", 1);
      } else if (remainingTime === 0 && phase === 1) {
          stopSound("tick", 1);
          playSound("end", 1);
      } else if (remainingTime === 8 && phase === 2) {
          playSound("tick", 2);
      } else if (remainingTime === 0 && phase === 2) {
          stopSound("tick", 2);
          playSound("end", 2);
      }

      if (remainingTime <= 0) {
          clearInterval(countdownInterval);
          phase++;

          if (phase === 3) {
              infoElement.innerText = `Your ${itemName} has burned 💥\n\n`;
              timerElement.style.display = "none";
              info2Element.innerText = "";
              circle.style.strokeDashoffset = '440';
              circle.style.visibility = 'hidden';
              burnedImage.style.visibility = 'visible';
          } else if (phase === 2) {
              startCountdown(id);
              infoElement.innerText = `Quick take your ${itemName} before it burns 💢`;
              timerElement.style.display = "inline";
              info2Element.innerText = "";
          }
      } else {
          timerElement.innerText = remainingTime;
      }
  }, 1000);

  updateCircle(totalDuration, startTime);
}

function playSound(type, phase) {
  stopAllSounds();

  if (type === "tick") {
      if (phase === 1) audioTick1.play();
      else if (phase === 2) audioTick2.play();
  } else if (type === "end") {
      if (phase === 1) audioEnd1.play();
      else if (phase === 2) audioEnd2.play();
  }
}

function stopSound(type, phase) {
  if (type === "tick") {
      if (phase === 1) {
          audioTick1.pause();
          audioTick1.currentTime = 0;
      } else if (phase === 2) {
          audioTick2.pause();
          audioTick2.currentTime = 0;
      }
  } else if (type === "end") {
      if (phase === 1) {
          audioEnd1.pause();
          audioEnd1.currentTime = 0;
      } else if (phase === 2) {
          audioEnd2.pause();
          audioEnd2.currentTime = 0;
      }
  }
}

function stopAllSounds() {
  audioTick1.pause();
  audioTick1.currentTime = 0;
  audioTick2.pause();
  audioTick2.currentTime = 0;
  audioEnd1.pause();
  audioEnd1.currentTime = 0;
  audioEnd2.pause();
  audioEnd2.currentTime = 0;
}

function updateCircle(totalDuration, startTime) {
  let elapsedTime = Date.now() - startTime;
  let progress = (elapsedTime / (totalDuration * 1000));
  circle.style.strokeDashoffset = (1 - progress) * 440;

  if (elapsedTime < totalDuration * 1000) {
      requestAnimationFrame(() => updateCircle(totalDuration, startTime));
  }
}

function openModal() {
  var modal = document.getElementById('modal');
  var blurBackground = document.getElementById('blur-background');
  modal.style.display = 'flex';
  blurBackground.style.display = 'block';
}

const buttons = document.querySelectorAll("nav button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
      openModal();
      const id = this.id;
      document.getElementById("modal").style.display = "flex";
      startCountdown(id);
  });
}

function closeModal() {
  var modal = document.getElementById('modal');
  var blurBackground = document.getElementById('blur-background');
  var burnedImage = document.getElementById("burnedImage");
  modal.style.display = 'none';
  blurBackground.style.display = 'none';
  burnedImage.style.visibility = 'hidden';
      // Reset circle
      circle.style.visibility = 'visible';
      circle.style.strokeDashoffset = '440';
}

document.getElementById("close").addEventListener("click", function () {
  closeModal();
  document.getElementById("modal").style.display = "none";
  stopAllSounds();
  phase = 1;
  document.getElementById("timer").style.display = "inline";
  circle.style.strokeDashoffset = '440';
  clearInterval(countdownInterval);
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
        console.log('Service Worker zarejestrowany poprawnie:', registration);
    })
    .catch(function(error) {
        console.log('Rejestracja Service Worker nie powiodła się:', error);
    });
}