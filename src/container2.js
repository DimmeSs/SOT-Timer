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
      const newImgSrc = "INFO_IMG/Regions-map.png";
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
  const event1StartUTC = new Date(now);
  const event1EndUTC = new Date(now);
  const event2StartUTC = new Date(now);
  const event2EndUTC = new Date(now);

  // Ustal daty dla 17:00-18:00 UTC
  event1StartUTC.setUTCHours(17, 0, 0, 0);
  event1EndUTC.setUTCHours(18, 0, 0, 0);

  // Ustal daty dla 01:00-02:00 UTC
  event2StartUTC.setUTCHours(1, 0, 0, 0);
  event2EndUTC.setUTCHours(2, 0, 0, 0);

  const event1LocalStart = event1StartUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const event1LocalEnd = event1EndUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const event2LocalStart = event2StartUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const event2LocalEnd = event2EndUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let timeString = 'Do najbliższego wydarzenia pozostało: ';

  if (now >= event1StartUTC && now <= event1EndUTC) {
    const timeLeft = event1EndUTC - now;
    const minutesLeft = Math.floor(timeLeft / (1000 * 60));
    timeString = `Trwa wydarzenie 1! Pozostało około ${minutesLeft} minut.`;
  } else if (now >= event2StartUTC && now <= event2EndUTC) {
    const timeLeft = event2EndUTC - now;
    const minutesLeft = Math.floor(timeLeft / (1000 * 60));
    timeString = `Trwa wydarzenie 2! Pozostało około ${minutesLeft} minut.`;
  } else {
    const diff1 = event1StartUTC - now;
    const diff2 = event2StartUTC - now;
    const nextEvent = diff1 < diff2 ? event1StartUTC : event2StartUTC;
    const timeUntil = nextEvent - now;

    const hours = Math.floor(timeUntil / (1000 * 60 * 60));
    const minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeUntil % (1000 * 60)) / 1000);

    if (hours > 0) {
      timeString += `${hours}h `;
    }
    if (minutes > 0) {
      timeString += `${minutes}m `;
    }
    if (hours === 0 && minutes === 0) {
      timeString += `${seconds}s`;
    }
  }

  document.getElementById("timeZone").innerText = `Twoja strefa czasowa: ${timeZone}`;
  document.getElementById("event1").innerText = `Czas wydarzenia 1: ${event1LocalStart} - ${event1LocalEnd}`;
  document.getElementById("event2").innerText = `Czas wydarzenia 2: ${event2LocalStart} - ${event2LocalEnd}`;
  document.getElementById("nextEvent").innerText = timeString;
}

window.onload = function() {
  displayEventInfo();
  setInterval(displayEventInfo, 1000);
};


