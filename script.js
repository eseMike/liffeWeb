document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  if (slides.length && dots.length) {
    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('activo', i === index);
        dots[i].classList.toggle('activo', i === index);
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
      });
    });
  }

  const botonArriba = document.getElementById('botonArriba');

  if (botonArriba) {
    window.addEventListener('scroll', () => {
      botonArriba.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    botonArriba.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const customSlides = document.querySelectorAll('.custom-slide');
  const customPagination = document.querySelector('.custom-slider-pagination');
  const sliderWrapper = document.querySelector('.custom-slider-wrapper');

  if (customSlides.length && customPagination && sliderWrapper) {
    let customCurrentIndex = 0;
    const customTotalSlides = customSlides.length;
    const slidesPerPage = window.innerWidth > 768 ? 2 : 1;
    const dotCount = Math.ceil(customTotalSlides / slidesPerPage);

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('span');
      dot.className = `custom-dot${i === 0 ? ' active' : ''}`;
      dot.dataset.index = i;
      customPagination.appendChild(dot);
    }

    const updateCustomSlider = () => {
      const offset = -((customCurrentIndex * 100) / slidesPerPage);
      sliderWrapper.style.transform = `translateX(${offset}%)`;

      document
        .querySelectorAll('.custom-dot')
        .forEach((dot) => dot.classList.remove('active'));
      const activeDot =
        document.querySelectorAll('.custom-dot')[
          Math.floor(customCurrentIndex / slidesPerPage)
        ];
      if (activeDot) activeDot.classList.add('active');
    };

    const autoCustomSlide = () => {
      customCurrentIndex =
        (customCurrentIndex + slidesPerPage) % customTotalSlides;
      updateCustomSlider();
    };

    let customInterval = setInterval(autoCustomSlide, 6000);

    customPagination.addEventListener('click', (e) => {
      if (e.target.classList.contains('custom-dot')) {
        clearInterval(customInterval);
        customCurrentIndex = parseInt(e.target.dataset.index) * slidesPerPage;
        updateCustomSlider();
        customInterval = setInterval(autoCustomSlide, 6000);
      }
    });

    updateCustomSlider();
  }

  const slider = document.querySelector('.clientes-slider-wrapper');

  if (slider) {
    // En demo, solo usamos el contenido original para no duplicar DOM
    slider.style.animation = 'scrollClientes 20s linear infinite';
  }
});
