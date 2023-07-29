
  // Wait for the DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    var preloader = document.getElementById("preloader");
    var content = document.getElementById("content");

    // After 3 seconds, fade out the preloader and fade in the content
    setTimeout(function() {
      preloader.style.opacity = "0"; /* Zmniejszamy przezroczystość na 0 */
      preloader.style.pointerEvents = "none"; /* Wyłączamy interakcję z preloaderem */

      content.style.opacity = "1"; /* Pokazujemy zawartość strony z przezroczystością 1 */
    }, 2000); // 3000 ms = 3 seconds

    // After 4 seconds, hide the preloader
    setTimeout(function() {
      preloader.style.display = "none"; /* Ukrywamy preloader */
    }, 3000); // 4000 ms = 4 seconds
  });

  // // Wait for the DOM to be fully loaded
  // document.addEventListener("DOMContentLoaded", function() {
  //   var preloader = document.getElementById("preloader");
  //   var content = document.getElementById("content");

  //   // Function to hide the preloader and show the content
  //   function showContent() {
  //     preloader.style.opacity = "0"; /* Zmniejszamy przezroczystość preloadera na 0 */
  //     preloader.style.pointerEvents = "none"; /* Wyłączamy interakcję z preloaderem */

  //     content.style.opacity = "1"; /* Pokazujemy zawartość strony z przezroczystością 1 */
  //   }

  //   // After 3 seconds, hide the preloader and show the content
  //   setTimeout(function() {
  //     showContent();
  //   }, 3000); // 3000 ms = 3 seconds

  //   // Check if all resources are loaded
  //   window.addEventListener("load", function() {
  //     showContent();
  //   });
  // });