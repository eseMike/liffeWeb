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

    boton.style.display = 'flex';
    boton.style.opacity = '1';
    boton.style.visibility = 'visible';

    boton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

      setTimeout(() => {
        if (window.scrollY > 0) {
          window.scrollTo(0, 0);
        }
      }, 800);
    });
  });

  // ================== TESTIMONIOS ==================
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

  // ================== MODAL ALE ==================
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

  // ========== NAVBAR ACTIVA ==========
  const navLinks = document.querySelectorAll('.nav-link');
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
    if (
      currentPath === linkPath ||
      (currentPath === '' && linkPath === 'index')
    ) {
      link.classList.add('active');
    }
  });
});

// ================== SLIDER TARJETAS MOVIL (CARGA CON `window.load`) ==================
window.addEventListener('load', () => {
  const sliderWrapper = document.querySelector('.custom-slider-wrapper');
  const slidesTarjetas = document.querySelectorAll('.custom-slide');
  const paginationContainer = document.querySelector(
    '.custom-slider-pagination'
  );

  if (sliderWrapper && slidesTarjetas.length > 0 && paginationContainer) {
    console.log('✅ Entramos al bloque de slider tarjetas');

    let currentIndex = 0;
    let autoSlideInterval;

    paginationContainer.innerHTML = '';

    slidesTarjetas.forEach((_, i) => {
      console.log('🔘 Creando dot', i);

      const dot = document.createElement('span');
      dot.classList.add('custom-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
        restartAutoSlide();
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

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slidesTarjetas.length;
        updateSlider();
      }, 6000);
    };

    const restartAutoSlide = () => {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    };

    updateSlider();
    startAutoSlide();
  } else {
    console.warn('⚠️ No se encontró el slider de tarjetas o sus elementos');
  }
});

console.log('🔥 El archivo JS está cargando');
