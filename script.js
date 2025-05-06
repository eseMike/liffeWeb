document.addEventListener('DOMContentLoaded', () => {
  // ================== SLIDER PRINCIPAL ==================
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

  // ================== BOTÓN "IR ARRIBA" ==================
  window.addEventListener('load', () => {
    const boton = document.getElementById('botonArriba');
    if (!boton) return;

    // Mostrar el botón desde el inicio
    boton.style.display = 'flex';
    boton.style.opacity = '1';
    boton.style.visibility = 'visible';

    // Al hacer clic, sube directamente hasta arriba
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Scroll forzado al top');

      // Solución final para todos los navegadores
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      // Fallback por si el smooth se interrumpe (extra)
      setTimeout(() => {
        if (window.scrollY > 0) {
          window.scrollTo(0, 0); // fuerza final
        }
      }, 800); // tiempo suficiente para el scroll smooth
    });
  });

  // ================== TESTIMONIOS AUTO SLIDER ==================
  const testimonialSlides = document.querySelectorAll('.slide');
  const testimonialDots = document.querySelectorAll('.dot');
  const testimonialSliderContainer = document.querySelector(
    '.testimonios-slider'
  );

  if (
    testimonialSlides.length &&
    testimonialDots.length &&
    testimonialSliderContainer
  ) {
    let testimonialIndex = 0;
    let testimonialInterval;

    const showTestimonial = (index) => {
      testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('activo', i === index);
        testimonialDots[i].classList.toggle('activo', i === index);
      });
    };

    const startTestimonialAutoSlide = () => {
      testimonialInterval = setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
        showTestimonial(testimonialIndex);
      }, 6000);
    };

    const stopTestimonialAutoSlide = () => {
      clearInterval(testimonialInterval);
    };

    startTestimonialAutoSlide();

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopTestimonialAutoSlide();
        testimonialIndex = index;
        showTestimonial(testimonialIndex);
        startTestimonialAutoSlide();
      });
    });

    testimonialSliderContainer.addEventListener(
      'mouseenter',
      stopTestimonialAutoSlide
    );
    testimonialSliderContainer.addEventListener(
      'mouseleave',
      startTestimonialAutoSlide
    );
  }

  // ================== SLIDER CLIENTES ==================
  const clientesSliderWrapper = document.querySelector(
    '.clientes-slider-wrapper'
  );

  if (clientesSliderWrapper) {
    const slides = Array.from(clientesSliderWrapper.children);
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clientesSliderWrapper.appendChild(clone);
    });
  }

  // ================== FORMULARIO ==================
  const form = document.querySelector('form');
  const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

  if (form && mensajeConfirmacion) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      mensajeConfirmacion.style.display = 'block';

      setTimeout(() => {
        mensajeConfirmacion.style.display = 'none';
      }, 5000);

      form.reset();
    });
  }

  // ================== SLIDER EMPLEADOS ==================
  const track = document.querySelector('.slider__track');
  if (track) {
    const items = [...track.children];
    const clone = items.map((item) => item.cloneNode(true));
    clone.forEach((clonedItem) => {
      track.appendChild(clonedItem);
    });
  }

  // ================== SECCIONES ACTIVAS EN NAVBAR ==================
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop();

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // ================== MODAL DE ALE ==================
  const aleCard = document.getElementById('aleMendoza');
  const modalAle = document.getElementById('modalAle');
  const closeModalAle = document.getElementById('closeModalAle');

  if (aleCard && modalAle && closeModalAle) {
    aleCard.addEventListener('click', () => {
      modalAle.style.display = 'flex';
    });

    closeModalAle.addEventListener('click', () => {
      modalAle.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modalAle) {
        modalAle.style.display = 'none';
      }
    });
  }

  // ================== SLIDER TARJETAS MOVIL ==================
  const sliderWrapper = document.querySelector('.custom-slider-wrapper');
  const slidesTarjetas = document.querySelectorAll('.custom-slide');
  const paginationContainer = document.querySelector(
    '.custom-slider-pagination'
  );

  if (sliderWrapper && slidesTarjetas.length > 0 && paginationContainer) {
    let currentIndex = 0;

    // Crear dots de paginación
    slidesTarjetas.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('custom-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      paginationContainer.appendChild(dot);
    });

    const updateSlider = () => {
      sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

      const dots = paginationContainer.querySelectorAll('.custom-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    updateSlider(); // Inicializa
  }
});
