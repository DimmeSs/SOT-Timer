// document.getElementById('downloadButton').addEventListener('click', function() {
//   // Sprawdź, czy przeglądarka obsługuje PWA (Service Worker i manifest)
//   if ('serviceWorker' in navigator && 'PushManager' in window) {
//     // Zarejestruj Service Workera i obsłuż instalację aplikacji
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(function(registration) {
//         console.log('Service Worker zarejestrowany:', registration);
//         // Wyślij powiadomienie o instalacji aplikacji (niektóre przeglądarki obsługują to)
//         registration.showNotification('Kliknij, aby zainstalować aplikację', {
//           icon: 'iconsApp/sot_icon192x192.png',
//           body: 'Dodaj aplikację do swojego ekranu startowego',
//         });
//       })
//       .catch(function(error) {
//         console.log('Rejestracja Service Workera nie powiodła się:', error);
//       });
//   } else {
//     // Przeglądarka nie obsługuje PWA
//     alert('Twoja przeglądarka nie obsługuje Progressive Web Apps.');
//   }
// });
// document.getElementById('downloadButton').addEventListener('click', function() {
//   if ('Notification' in window) {
//     Notification.requestPermission()
//       .then(function(permission) {
//         if (permission === 'granted') {
//           // Powiadomienie zostało zezwolone, można wywołać showNotification
//           showInstallNotification();
//         } else {
//           // Powiadomienie zostało zablokowane lub użytkownik jeszcze nie podjął decyzji
//           console.log('Użytkownik zablokował powiadomienia lub jeszcze nie podjął decyzji.');
//         }
//       })
//       .catch(function(error) {
//         console.log('Błąd podczas próby uzyskania zgody na powiadomienia:', error);
//       });
//   }
// });

// function showInstallNotification() {
//   if ('serviceWorker' in navigator && 'PushManager' in window) {
//     navigator.serviceWorker.ready.then(function(registration) {
//       registration.showNotification('Kliknij, aby zainstalować aplikację', {
//         icon: 'iconsApp/sot_icon192x192.png',
//         body: 'Dodaj aplikację do swojego ekranu startowego',
//       });
//     });
//   }
// }

const timers = {
  // BFish: { timer1: 10, timer2: 12 },
  // [Down here is normal fish timers]
  BFish: { timer1: 15, timer2: 35 },
  BMeat: { timer1: 65, timer2: 55 },
  BTFish: { timer1: 95, timer2: 85 },
  BMonsterM: { timer1: 125, timer2: 115 },
};

const circle = document.getElementById('circle');
let countdownInterval;
let phase = 1;

function startCountdown(id) {
  let timer = timers[id].timer1;
  let totalDuration = timer;
  
  if (phase === 1) {
    timer = timers[id].timer1;
    totalDuration = timer;
    circle.style.visibility = 'visible';
  } else if (phase === 2) {
    timer = timers[id].timer2;
    totalDuration = timer;
    circle.style.strokeDashoffset = '440';
    circle.style.visibility = 'visible';
  }
  let initialProgress = timer / totalDuration;
  let initialDashoffsetValue = initialProgress * 440; 
  circle.style.strokeDashoffset = initialDashoffsetValue;
  let tip;

  if (id === "BFish" || id === "BTFish") {
    tip = "Wait for the eyes to turn completely white";
  } else {
    tip = "Wait for the entire piece to turn brown. No pink should be visible";
  }

  let name;

  if (id === "BTFish") {
    name = "Trophy Fish";
  } else if (id === "BMonsterM") {
    name = "Kraken / Megalodon";
  } else if (id === "BMeat") {
    name = "Basic Meat";
  } else if (id === "BFish") {
    name = "Fish";
  }

  const infoElement = document.getElementById("info");
  const timerElement = document.getElementById("timer");
  const info2Element = document.getElementById("info2");

  infoElement.innerText = `Wait for ${name} to get perfectly cooked`;
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
        timerElement.style.display = "none";
        info2Element.innerText = "";
        circle.style.strokeDashoffset = '440';
        circle.style.visibility = 'hidden';
        phase = 1;
      } else if (phase === 2) {
        timer = timers[id].timer2;
        totalDuration = timer;
        startCountdown(id);
        infoElement.innerText = `Quick take your ${name} before it burns!`;
        timerElement.style.display = "inline";
        info2Element.innerText = "";
      }
    }
    
    let progress = timer/totalDuration;
    let dashoffsetValue = progress * 440; 

    circle.style.strokeDashoffset = dashoffsetValue;

    timerElement.innerText = timer;
    timer--;
  }, 1000);
}







const audio1 = new Audio("END-ALARM-1.mp3");
const audio2 = new Audio("END-ALARM-2.mp3");

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

function openModal() {
  var modal = document.getElementById('modal');
  var blurBackground = document.getElementById('blur-background');
  modal.style.display = 'flex';
  blurBackground.style.display = 'block'; // Pokazujemy element blur-background
}
const buttons = document.querySelectorAll("nav button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    openModal()
    const id = this.id;
    document.getElementById("modal").style.display = "flex";
    startCountdown(id);
  });
}

function closeModal() {
  var modal = document.getElementById('modal');
  var blurBackground = document.getElementById('blur-background');
  modal.style.display = 'none';
  blurBackground.style.display = 'none'; // Ukrywamy element blur-background
}

document.getElementById("close").addEventListener("click", function () {
  closeModal()
  document.getElementById("modal").style.display = "none";
  stopSound();
  phase = 1;
  document.getElementById("timer").style.display = "inline";
  circle.style.strokeDashoffset = '440';
  clearInterval(countdownInterval);
});


