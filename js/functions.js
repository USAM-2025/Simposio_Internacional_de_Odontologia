const universities = [
  {
    id: 1,
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "Daniela Benavides",
    bannerUrl: "img/usam.jpg",
  },
  {
    id: 2,
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "Diana Meléndez",
    bannerUrl: "img/usam1.jpg",
  },
  {
    id: 3,
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "Eric Martínez",
    bannerUrl: "img/usam2.jpg",
  },
  {
    id: 4,
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "Evelyn Durán",
    bannerUrl: "img/usam3.jpg",
  },
  {
    id: 5,
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "Emme Arias",
    bannerUrl: "img/usam4.jpg",
  },
  {
    id: 6,
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "Gabriela Salguero",
    bannerUrl: "img/usam5.jpg",
  },
  {
    id: 7,
    name: "Universidad de El Salvador",
    country: "Julio Portillo",
    bannerUrl: "img/ues.jpg",
  },
  {
    id: 8,
    name: "Universidad Evangélica de El Salvador",
    country: "Emerson Pineda",
    bannerUrl: "img/uees.jpg",
  },
  {
    id: 9,
    name: "Universidad Evangélica de El Salvador",
    country: "Evelyn Umaña",
    bannerUrl: "img/uees1.jpg",
  },
  {
    id: 10,
    name: "Universidad Panamericana de Guatemala",
    country: "Diego Marroquín",
    bannerUrl: "img/upg.jpg",
  },
  {
    id: 11,
    name: "Universidad Autónoma de Honduras",
    country: "Laura Hernández",
    bannerUrl: "img/uah.jpg",
  },
  {
    id: 12,
    name: "Universidad Autónoma de Honduras",
    country: "Tania Vargas",
    bannerUrl: "img/uah1.jpg",
  },
  {
    id: 13,
    name: "Universidad Olmeca de México",
    country: "José Nolasco",
    bannerUrl: "img/uom.jpg",
  },
];

// Generar botones de universidades
const container = document.getElementById("universities-container");

universities.forEach((university) => {
  const button = document.createElement("div");
  button.className = "university-btn";
  button.innerHTML = `
                <div class="university-name">${university.name}</div>
                <div class="university-country">${university.country}</div>
            `;

  button.addEventListener("click", () => {
    openModal(university);
  });

  container.appendChild(button);
});

// Funcionalidad del modal
const modal = document.getElementById("banner-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const closeBtn = document.querySelector(".close-btn");

function openModal(university) {
  modalTitle.textContent = `${university.name} - ${university.country}`;
  modalImage.src = university.bannerUrl;
  modalImage.alt = `Banner de ${university.name}`;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Cerrar modal con la tecla Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Cronómetro para el simposio
function updateCountdown() {
  const symposiumDate = new Date('2025-09-18T08:00:00');
  const now = new Date();
  const difference = symposiumDate - now;
  
  if (difference <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Iniciar el cronómetro
updateCountdown();
setInterval(updateCountdown, 1000);

// Carrusel de participantes
const carouselImages = [
  "img/usam.jpg",
  "img/usam1.jpg",
  "img/usam2.jpg",
  "img/usam3.jpg",
  "img/usam4.jpg",
  "img/usam5.jpg",
  "img/ues.jpg",
  "img/uees.jpg",
  "img/uees1.jpg",
  "img/upg.jpg",
  "img/uah.jpg",
  "img/uah1.jpg",
  "img/uom.jpg"
];

function initializeCarousel() {
  const carouselSlide = document.getElementById('carousel-slide');
  const carouselDots = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  let currentIndex = 0;
  
  // Crear elementos del carrusel
  carouselImages.forEach((image, index) => {
    // Crear elemento de imagen
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    
    // Agregar indicador de carga
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading';
    carouselItem.appendChild(loadingIndicator);
    
    const img = document.createElement('img');
    img.src = image;
    img.alt = `Participante ${index + 1}`;
    
    // Manejar la carga de la imagen
    img.onload = function() {
      loadingIndicator.remove();
    };
    
    img.onerror = function() {
      loadingIndicator.remove();
      console.error(`Error al cargar la imagen: ${image}`);
    };
    
    carouselItem.appendChild(img);
    carouselSlide.appendChild(carouselItem);
    
    // Crear punto de navegación
    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    
    carouselDots.appendChild(dot);
  });
  
  // Funciones de navegación
  function goToSlide(index) {
    if (index < 0) index = carouselImages.length - 1;
    if (index >= carouselImages.length) index = 0;
    
    currentIndex = index;
    carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Actualizar puntos activos
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  // Auto avanzar cada 5 segundos
  let autoSlide = setInterval(nextSlide, 5000);
  
  // Pausar auto slide al interactuar
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
  });
  
  carouselContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
  });
  
  // Navegación táctil para dispositivos móviles
  let startX = 0;
  let endX = 0;
  
  carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlide);
  }, { passive: true });
  
  carouselContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
    autoSlide = setInterval(nextSlide, 5000);
  }, { passive: true });
  
  function handleSwipe() {
    const threshold = 50; // Mínimo desplazamiento para considerar un swipe
    if (startX - endX > threshold) {
      nextSlide(); // Swipe izquierda
    } else if (endX - startX > threshold) {
      prevSlide(); // Swipe derecha
    }
  }
}

// Inicializar el carrusel cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Animaciones adicionales para la muela dental con cara
document.addEventListener('DOMContentLoaded', function() {
  const tooth = document.querySelector('.tooth');
  const toothContainer = document.querySelector('.tooth-container');
  const eyes = document.querySelectorAll('.eye');
  
  // Crear partículas de brillo
  function createSparkles() {
    const sparkleCount = 3;
    
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 80 + 10 + 'px';
      sparkle.style.top = Math.random() * 70 + 10 + 'px';
      sparkle.style.animationDelay = Math.random() * 2 + 's';
      sparkle.style.width = Math.random() * 5 + 3 + 'px';
      sparkle.style.height = sparkle.style.width;
      
      toothContainer.appendChild(sparkle);
    }
  }
  
  // Animación de mirada alrededor
  function lookAround() {
    eyes.forEach(eye => {
      eye.style.animation = 'lookAround 8s infinite ease-in-out';
    });
    
    // Cambiar dirección aleatoriamente
    setTimeout(() => {
      const randomX = (Math.random() * 4 - 2) + 'px';
      const randomY = (Math.random() * 2 - 1) + 'px';
      
      eyes.forEach(eye => {
        eye.style.transform = `translate(${randomX}, ${randomY})`;
      });
    }, 8000);
  }
  
  // Iniciar partículas de brillo
  createSparkles();
  
  // Iniciar animación de mirada
  setInterval(lookAround, 8000);
  
  // Agregar interacción al pasar el mouse
  toothContainer.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    tooth.style.animationDuration = '2s';
    document.querySelector('.tooth-mouth').style.animationDuration = '0.8s';
  });
  
  toothContainer.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    tooth.style.animationDuration = '3s';
    document.querySelector('.tooth-mouth').style.animationDuration = '1.5s';
  });
  
  // Agregar animación de latido
  function heartBeat() {
    tooth.style.transform = 'translateX(-50%) scale(1.05)';
    
    setTimeout(() => {
      tooth.style.transform = 'translateX(-50%) scale(1)';
    }, 200);
  }
  
  // Iniciar efecto de latido ocasional
  setInterval(() => {
    // 20% de probabilidad de que ocurra el latido
    if (Math.random() < 0.2) {
      heartBeat();
    }
  }, 3000);
  
  // Hacer que los ojos sigan el cursor del mouse
  document.addEventListener('mousemove', function(e) {
    if (!toothContainer.matches(':hover')) return;
    
    const rect = toothContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) / 30;
    const moveY = (y - centerY) / 30;
    
    eyes.forEach(eye => {
      eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
});

// Añadir estilos para las partículas de brillo
const sparkleStyles = `
.sparkle {
  position: absolute;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  animation: sparkleFlash 2s infinite;
  z-index: 20;
}

@keyframes sparkleFlash {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}
`;

// Insertar los estilos de las partículas
const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleStyles;
document.head.appendChild(styleSheet);