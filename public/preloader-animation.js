// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  var preloader = document.getElementById("preloader");
  var content = document.getElementById("content");


  (async () => {
    const wait = (n) => new Promise((res) => setTimeout(res, n));
    const loadImg = () =>
    new Promise((res) => {
        const el = document.querySelector("#section-0");
        const imgToLoad = document.createElement("img");
        imgToLoad.src = el.src;
        imgToLoad.addEventListener("load", ()=>{
          el.replaceWith(imgToLoad);
          res();
        });
    });

    await Promise.all([wait(3000), loadImg()]);
    console.log("Loaded");
    preloader.style.opacity = "0"; /* Zmniejszamy przezroczystość na 0 */
    preloader.style.pointerEvents =
      "none"; /* Wyłączamy interakcję z preloaderem */

    content.style.opacity =
      "1"; /* Pokazujemy zawartość strony z przezroczystością 1 */
    preloader.style.display = "none";
  })();
});
