// STICKY NAV
document.addEventListener("DOMContentLoaded", function() {
  const menuBar = document.querySelector("header");
  const navImages = document.querySelector(".nav-images");  // Dodaj selektor dla .nav-images
  const stickyPoint = menuBar.offsetTop;

  window.addEventListener("scroll", function() {
    if (window.pageYOffset >= stickyPoint) {
      menuBar.classList.add("sticky");
      menuBar.classList.add("animate-show");
    } else {
      menuBar.classList.remove("sticky");
      menuBar.classList.remove("animate-show");

    }
  });
});


// SLIDER

let currentSlide = 1;
const totalSlides = 6;
const slideChangeInterval = 5000;
let slideChangeTimer;
let resumeTimer;
let hideTimer;
let isMouseOverB = false;
let isImageLocked = false;

function changeSlide() {
  currentSlide++;
  if (currentSlide > totalSlides) {
    currentSlide = 1;
  }
  showSlide(currentSlide);
}

function showSlide(slideNumber) {
  const slider = document.querySelector(".slider");
  const slideWidth = slider.scrollWidth / totalSlides;
  slider.scrollLeft = (slideNumber - 1) * slideWidth;
}

function startSlideChange() {
  stopSlideChange();
  slideChangeTimer = setInterval(changeSlide, slideChangeInterval);
}

function stopSlideChange() {
  clearInterval(slideChangeTimer);
  slideChangeTimer = null;
}

startSlideChange();

const sliderNavLinks = document.querySelectorAll(".slider-nav a");
sliderNavLinks.forEach((link, index) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    showSlide(index + 1);
  });
});

const listItems = document.querySelectorAll("li[data-src]");
const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");

listItems.forEach((item) => {
  const textNodes = Array.from(item.childNodes).filter(
    (node) => node.nodeType === 3 || node.nodeName === "B"
  );
  textNodes.forEach((textNode) => {
    textNode.addEventListener("mouseenter", function () {
      const imagePath = item.getAttribute("data-src");
      overlayImage.src = imagePath;
      overlay.style.display = "flex";
      clearTimeout(resumeTimer);
      clearTimeout(hideTimer);
      isMouseOverB = true;
      setTimeout(function () {
        overlay.style.opacity = "1";
      }, 10);
      stopSlideChange();
    });

    textNode.addEventListener("mouseleave", function () {
      isMouseOverB = false;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (!isMouseOverB && !isImageLocked) {
          overlay.style.opacity = "0";
          setTimeout(function () {
            if (!isMouseOverB && !isImageLocked) {
              overlay.style.display = "none";
            }
          }, 1150);
        }
      }, 2000);
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        if (!isMouseOverB && !isImageLocked) {
          startSlideChange();
        }
      }, 3000);
    });
  });
});

overlayImage.addEventListener("click", function () {
  isImageLocked = !isImageLocked;
  if (isImageLocked) {
    clearTimeout(hideTimer);
    clearTimeout(resumeTimer);
  } else {
    overlay.style.opacity = "0";
    setTimeout(function () {
      overlay.style.display = "none";
    }, 1150);
    startSlideChange();
  }
});

document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

const sliderWrapper = document.querySelector("#Mouse_slider");

sliderWrapper.addEventListener("mouseenter", function () {
  stopSlideChange();
});

sliderWrapper.addEventListener("mouseleave", function () {
  startSlideChange();
});

// ScrollToTop
window.addEventListener("scroll", function () {
  const scrollUpHere = document.getElementById("show-scroll-from-here");
  const scrollTopBtn = document.getElementById("scroll-to-top");
  const scrollUpHereTop = scrollUpHere.getBoundingClientRect().top;

  if (scrollUpHereTop <= 0) {
    scrollTopBtn.style.display = "block";
    scrollTopBtn.classList.add("scroll-fade-in");
    scrollTopBtn.classList.remove("scroll-fade-out");
  } else {
    scrollTopBtn.classList.add("scroll-fade-out");
    scrollTopBtn.classList.remove("scroll-fade-in");
  }
});

const scrollTopBtn = document.getElementById("scroll-to-top");
scrollTopBtn.addEventListener("click", scrollToNav);

function scrollToNav() {
  const nav = document.querySelector("nav");
  nav.scrollIntoView({ behavior: "smooth" });
}
// show image what to sell
document.addEventListener("DOMContentLoaded", function () {
  const fishLinks = document.querySelectorAll(".fish-link-item");
  const imgElement = document.getElementById("fish-image-example");

  fishLinks.forEach((link) => {
    link.addEventListener("mouseenter", function (event) {
      const imageUrl = event.target.getAttribute("data-image");
      imgElement.src = imageUrl;
      imgElement.style.display = "inline";
    });

    link.addEventListener("mouseleave", function () {
      imgElement.style.display = "none";
    });
  });
});


// POP UP IMAGE REGIONS
document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery-image');
  const popupOverlay = document.getElementById('popup-overlay');
  const popupImage = document.getElementById('popup-image');
  const showFullImageButton = document.getElementById('show-full-image');

  galleryImages.forEach((image) => {
    image.addEventListener('click', function() {
      const newImgSrc = "INFO_IMG/Regions-map-min.png";
      popupImage.setAttribute('src', newImgSrc);

      popupOverlay.style.display = 'flex';
      showFullImageButton.classList.add('hidden');
      
      void popupOverlay.offsetWidth;

      popupOverlay.classList.add('show');
      showFullImageButton.classList.remove('hidden');
    });
  });

  popupOverlay.addEventListener('click', () => {
    popupOverlay.classList.remove('show');
    showFullImageButton.classList.add('hidden');

    setTimeout(() => {
      popupOverlay.style.display = 'none';
    }, 300);
  });

  popupImage.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  popupImage.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });

  showFullImageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const fullImageURL = "/INFO_IMG/Regions-map.png";
    window.open(fullImageURL, '_blank');
  });
});
// GOLD RUSH TIME ZONE 
function displayEventInfo() {
  const now = new Date();
  const event1UTC = new Date(now);
  const event2UTC = new Date(now);

  // Ustal datę dla 17:00 UTC
  event1UTC.setUTCHours(17, 0, 0, 0);

  // Ustal datę dla 01:00 UTC
  event2UTC.setUTCHours(1, 0, 0, 0);

  // Jeżeli już po wydarzeniu, dodaj 1 dzień
  if (now > event1UTC) {
    event1UTC.setDate(event1UTC.getDate() + 1);
  }

  if (now > event2UTC) {
    event2UTC.setDate(event2UTC.getDate() + 1);
  }

  let isGoldRush = false;
  let endOfGoldRush;
  if (now >= event1UTC && now < new Date(event1UTC).setUTCHours(18)) {
    isGoldRush = true;
    endOfGoldRush = new Date(event1UTC).setUTCHours(18);
  } else if (now >= event2UTC && now < new Date(event2UTC).setUTCHours(2)) {
    isGoldRush = true;
    endOfGoldRush = new Date(event2UTC).setUTCHours(2);
  }

  const event1LocalTime = event1UTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const event2LocalTime = event2UTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const diff1 = event1UTC - now;
  const diff2 = event2UTC - now;

  const nextEvent = diff1 < diff2 ? event1UTC : event2UTC;
  const timeUntil = nextEvent - now;

  let hours = Math.floor(timeUntil / (1000 * 60 * 60));
  let minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));

  const timeUntilEndOfGoldRush = endOfGoldRush - now;
  let hoursToEnd = Math.floor(timeUntilEndOfGoldRush / (1000 * 60 * 60));
  let minutesToEnd = Math.floor((timeUntilEndOfGoldRush % (1000 * 60 * 60)) / (1000 * 60));

  const div = document.getElementById('mojDiv');
  document.getElementById("when-local").innerText = `${event1LocalTime} and ${event2LocalTime}`;
  
  function przelaczGIF(isGoldRush) {
    const div = document.getElementById('mojDiv');
    if (isGoldRush) {
      div.classList.add('pokazGIF');
      body.classList.add('pokazGIF');
    } else {
      div.classList.remove('pokazGIF');
      body.classList.remove('pokazGIF');
    }
  }


  let timeString = "";
  if (isGoldRush) {
    timeString += "GOLD RUSH IS HERE, ends in: ";
    if (hoursToEnd > 0) {
      timeString += `${hoursToEnd} hours `;
    }
    timeString += `${minutesToEnd} minutes`;
  } else {
    timeString += "GOLD RUSH will be in: ";
    if (hours > 0) {
      timeString += `${hours} hours `;
    }
    timeString += `${minutes} minutes`;
  }

  document.getElementById("nextEvent").innerText = timeString;
}

// Wywołaj funkcję po załadowaniu strony
window.onload = function() {
  // Wywołaj raz, a potem co minutę
  displayEventInfo();
  setInterval(displayEventInfo, 60000);
};
