document.addEventListener("DOMContentLoaded", function () {
   const slides = document.querySelectorAll(".slide");
   const dots = document.querySelectorAll(".dot");

   let currentIndex = 0;

   function showSlide(index) {
      slides.forEach((slide, i) => {
         slide.classList.toggle("activo", i === index);
         dots[i].classList.toggle("activo", i === index);
      });
   }

   dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
         currentIndex = index;
         showSlide(currentIndex);
      });
   });

   setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
   }, 5000); // Cambia cada 5 segundos
});

document.addEventListener("DOMContentLoaded", function () {
   const botonArriba = document.getElementById("botonArriba");

   window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
         botonArriba.style.display = "flex";
      } else {
         botonArriba.style.display = "none";
      }
   });

   botonArriba.addEventListener("click", () => {
      window.scrollTo({top: 0, behavior: "smooth"});
   });
});
