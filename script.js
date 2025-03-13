document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('activo', i === index);
      dots[i].classList.toggle('activo', i === index);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // setInterval(() => {
  //   currentIndex = (currentIndex + 1) % slides.length;
  //   showSlide(currentIndex);
  // }, 5000); // Cambia cada 5 segundos
});

document.addEventListener('DOMContentLoaded', function () {
  const botonArriba = document.getElementById('botonArriba');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      botonArriba.style.display = 'flex';
    } else {
      botonArriba.style.display = 'none';
    }
  });

  botonArriba.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Slider personalizado
document.addEventListener('DOMContentLoaded', function () {
  let customCurrentIndex = 0;
  const customSlides = document.querySelectorAll('.custom-slide');
  const customTotalSlides = customSlides.length;
  const customPagination = document.querySelector('.custom-slider-pagination');

  // Crear paginación con el número correcto de puntos según el dispositivo
  for (
    let i = 0;
    i <
    (window.innerWidth > 768
      ? Math.ceil(customTotalSlides / 2)
      : customTotalSlides);
    i++
  ) {
    let dot = document.createElement('span');
    dot.classList.add('custom-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-index', i);
    customPagination.appendChild(dot);
  }

  const updateCustomSlider = () => {
    let viewportWidth = window.innerWidth;
    let slidesPerPage = viewportWidth > 768 ? 2 : 1;
    let offset = -((customCurrentIndex * 100) / slidesPerPage);
    document.querySelector('.custom-slider-wrapper').style.transform =
      `translateX(${offset}%)`;
    document
      .querySelectorAll('.custom-dot')
      .forEach((dot) => dot.classList.remove('active'));
    document
      .querySelectorAll('.custom-dot')
      [Math.floor(customCurrentIndex / slidesPerPage)].classList.add('active');
  };

  // Función para cambiar de slide automáticamente
  const autoCustomSlide = () => {
    customCurrentIndex =
      (customCurrentIndex + (window.innerWidth > 768 ? 2 : 1)) %
      customTotalSlides;
    updateCustomSlider();
  };

  let customInterval = setInterval(autoCustomSlide, 6000);

  // Evento de clic en la paginación
  document.querySelectorAll('.custom-dot').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      clearInterval(customInterval);
      customCurrentIndex =
        parseInt(e.target.getAttribute('data-index')) *
        (window.innerWidth > 768 ? 2 : 1);
      updateCustomSlider();
      customInterval = setInterval(autoCustomSlide, 6000);
    });
  });

  updateCustomSlider();
});

// Slider de clientes
// document.addEventListener('DOMContentLoaded', function () {
//   const sliderWrapper = document.querySelector('.clientes-slider-wrapper');
//   const slides = document.querySelectorAll('.clientes-slide');
//   let currentIndex = 0;
//   let slidesPerView = window.innerWidth > 768 ? 6 : 3;
//   const totalSlides = slides.length;

//   const updateSlider = () => {
//     let offset = -((currentIndex * 100) / slidesPerView);
//     sliderWrapper.style.transform = `translateX(${offset}%)`;
//   };

//   const autoSlide = () => {
//     currentIndex = (currentIndex + slidesPerView) % totalSlides;
//     updateSlider();
//   };

//   let interval = setInterval(autoSlide, 5000);

//   window.addEventListener('resize', () => {
//     slidesPerView = window.innerWidth > 768 ? 6 : 3;
//     updateSlider();
//   });

//   updateSlider();
// });

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.clientes-slider-wrapper');
  let clonedContent = slider.innerHTML + slider.innerHTML;
  slider.innerHTML = clonedContent;
  slider.style.animation = 'scrollClientes 20s linear infinite';
});
