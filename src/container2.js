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
