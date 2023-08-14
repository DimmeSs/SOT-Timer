$(document).ready(function() {
    const slideDuration = 1000;
    const images = ["#image1", "#image2", "#image3", "#image4"];
    const initialPositions = [9, 511, 1013, 1515];
    let currentImageIndex = 0;

    function getNextImageIndex() {
        return (currentImageIndex + 1) % images.length;
    }

    function animateImage() {
        const currentImage = $(images[currentImageIndex]);
        const nextImage = $(images[getNextImageIndex()]);

        // Ustaw następny obraz za aktualnie przesuwanym obrazem
        nextImage.attr('x', parseFloat(currentImage.attr('x')) + 502);

        // Przesuń obecny obraz w lewo
        currentImage.animate({ x: '-=502' }, slideDuration, function() {
            // Zresetuj pozycję obecnego obrazu do początkowej pozycji
            currentImage.attr('x', initialPositions[currentImageIndex]);
            
            // Uaktualnij indeks obrazu
            currentImageIndex = getNextImageIndex();

            // Rozpocznij animację dla następnego obrazu
            animateImage();
        });
    }

    animateImage();
});
