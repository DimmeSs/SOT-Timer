let currentSlide = 1;
const totalSlides = 6; 
const slideChangeInterval = 5000;  

function changeSlide() {
    currentSlide++;
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    }

    // Przejście do odpowiedniego slajdu
    const slideElement = document.getElementById(`slide-${currentSlide}`);
    slideElement.scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
}

// Rozpoczyna automatyczne przejście między slajdami
setInterval(changeSlide, slideChangeInterval);


const listItems = document.querySelectorAll('li[data-src]');
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');

listItems.forEach(item => {
    // Dodajemy nasłuchiwanie do tekstu wewnątrz li oraz do elementu <b>
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
