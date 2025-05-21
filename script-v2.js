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

  const testimonialSlides = document.querySelectorAll('.slide');
  const testimonialSliderContainer = document.querySelector(
    '.testimonios-slider'
  );
  const paginacionContainer = document.querySelector('.paginacion');

  if (
    testimonialSlides.length &&
    testimonialSliderContainer &&
    paginacionContainer
  ) {
    let testimonialIndex = 0;
    let testimonialInterval;

    // Limpiamos y generamos paginación dinámica
    paginacionContainer.innerHTML = '';

    testimonialSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('data-slide', i);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ver testimonio ${i + 1}`);
      paginacionContainer.appendChild(dot);
    });

    const testimonialDots = paginacionContainer.querySelectorAll('.dot');

    const showTestimonial = (index) => {
      testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('activo', i === index);
      });
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('activo', i === index);
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

    showTestimonial(testimonialIndex);
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

// ================== AUTO SLIDER EQUIPO ==================
const equipoSlider = document.querySelector('.equipo__slider');

if (equipoSlider) {
  let autoScrollInterval;
  let isUserScrolling = false;
  let lastScrollTime = 0;

  const scrollAmount = 270; // depende del width de .slider__item + gap

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      if (!isUserScrolling) {
        equipoSlider.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }

      // Reiniciar el scroll si llegamos al final
      if (
        equipoSlider.scrollLeft + equipoSlider.clientWidth >=
        equipoSlider.scrollWidth
      ) {
        equipoSlider.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 4000);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  equipoSlider.addEventListener('scroll', () => {
    isUserScrolling = true;
    lastScrollTime = Date.now();
  });

  // Reanudar scroll automático después de 6 segundos de inactividad
  setInterval(() => {
    if (Date.now() - lastScrollTime > 6000) {
      isUserScrolling = false;
    }
  }, 1000);

  startAutoScroll();
}

// ========== SECCIONES ACTIVAS EN NAVBAR ==========
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  // Normalizamos el pathname, considerando casos con o sin .html, y sin barra final
  const currentPath = window.location.pathname
    .split('/')
    .pop()
    .replace(/\.html$/, '')
    .toLowerCase();

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const linkPath = href
      .split('/')
      .pop()
      .replace(/\.html$/, '')
      .toLowerCase();

    // Compara rutas normalizadas
    if (
      currentPath === linkPath ||
      (currentPath === '' && linkPath === 'index')
    ) {
      link.classList.add('active');
    }
  });
});
