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
  const boton = document.getElementById('botonArriba');
  if (boton) {
    boton.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('¡Botón clickeado!');

      // Prueba primero scroll en body
      if (document.body.scrollTop > 0) {
        document.body.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else if (document.documentElement.scrollTop > 0) {
        // Si el scroll está en html
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        // Si hay un contenedor con scroll
        const scrollable = document.querySelector('[style*="overflow"]');
        if (scrollable) {
          scrollable.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }
    });
  }

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

    // Iniciar auto-slide
    startTestimonialAutoSlide();

    // Paginación manual (dots)
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopTestimonialAutoSlide();
        testimonialIndex = index;
        showTestimonial(testimonialIndex);
        startTestimonialAutoSlide();
      });
    });

    // Pausar si el cursor está encima
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
    // Duplicamos todos los logos para lograr un scroll infinito
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

  // ================== CUSTOM SLIDER (OTRO BLOQUE) ==================
  // Solo se define una vez arriba, este bloque era duplicado así que no se repite
});

// Secciones acrive en toolbar

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop(); // Solo el nombre del archivo

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});

// MODAL
// Elementos del DOM
const aleCard = document.getElementById('aleMendoza');
const modalAle = document.getElementById('modalAle');
const closeModalAle = document.getElementById('closeModalAle');

// Abrir modal
aleCard.addEventListener('click', () => {
  modalAle.style.display = 'flex';
});

// Cerrar modal
closeModalAle.addEventListener('click', () => {
  modalAle.style.display = 'none';
});

// Cerrar si se hace clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modalAle) {
    modalAle.style.display = 'none';
  }
});
