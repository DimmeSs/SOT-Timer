let currentSlide = 1;
const totalSlides = 6;
const slideChangeInterval = 5000;

function changeSlide() {
  currentSlide++;
  if (currentSlide > totalSlides) {
    currentSlide = 1;
  }
  showSlide(currentSlide);
}

function showSlide(slideNumber) {
  const slider = document.querySelector('.slider');
  const slideWidth = slider.scrollWidth / totalSlides;
  slider.scrollLeft = (slideNumber - 1) * slideWidth;
}

// Rozpoczyna automatyczne przejście między slajdami
setInterval(changeSlide, slideChangeInterval);

const sliderNavLinks = document.querySelectorAll('.slider-nav a');
sliderNavLinks.forEach((link, index) => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    showSlide(index + 1);
  });
});

const listItems = document.querySelectorAll('li[data-src]');
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');

listItems.forEach(item => {
  const textNodes = Array.from(item.childNodes).filter(node => node.nodeType === 3 || node.nodeName === "B");
  textNodes.forEach(textNode => {
    textNode.addEventListener('mouseenter', function() {
      const imagePath = item.getAttribute('data-src');
      overlayImage.src = imagePath;
      overlay.style.display = 'flex';
    });

    textNode.addEventListener('mouseleave', function() {
      overlay.style.display = 'none';
    });
  });
});

overlay.addEventListener('mouseenter', function() {
  overlay.style.display = 'none';
});

document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

