const universityPosts = [
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "",
  },
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "",
  },
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "",
  },
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "",
  },
];

const universities = [
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "../img/usam.jpg",
  },
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "../img/usam1.jpg",
  },
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "../img/usam2.jpg",
  },
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "../img/usam3.jpg",
  },
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "../img/usam4.jpg",
  },
  {
    name: "Universidad Salvadoreña Alberto Masferrer",
    country: "El Salvador",
    banner: "../img/usam5.jpg",
  },
  {
    name: "Universidad de El Salvador",
    country: "El Salvador",
    banner: "../img/ues.jpg",
  },
  {
    name: "Universidad Evangélica de El Salvador",
    country: "El Salvador",
    banner: "../img/uees.jpg",
  },
  {
    name: "Universidad Evangélica de El Salvador",
    country: "El Salvador",
    banner: "../img/uees1.jpg",
  },
  {
    name: "Universidad Panamericana de Guatemala",
    country: "Guatemala",
    banner: "../img/upg.jpg",
  },
  {
    name: "Universidad Autonóma de Honduras",
    country: "Honduras",
    banner: "../img/uah.jpg",
  },
  {
    name: "Universidad Autonóma de Honduras",
    country: "Honduras",
    banner: "../img/uah1.jpg",
  },
  {
    name: "Universidad Olmeca de México",
    country: "México",
    banner: "../img/uom.jpg",
  },
];

// Variables globales
let currentSlide = 0;
let slideInterval;

// Inicializar la página cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  initializeCountdown();
  initializeUniversities();
  initializeCarousel();
  initializeModal();
  setupScrollAnimations();
  startCarousel();
});

// Configurar animaciones de scroll
function setupScrollAnimations() {
  const sections = document.querySelectorAll(
    ".collapsible-section, .intro-section, .countdown-section, .program-section, .universities-grid, .carousel-section, .quotes-section"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Inicializar el countdown
function initializeCountdown() {
  const eventDate = new Date("2025-09-18T08:00:00");

  function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Inicializar botones de universidades
function initializeUniversities() {
  const container = document.getElementById("universities-container");

  universityPosts.forEach((university, index) => {
    const button = document.createElement("button");
    button.className = "university-btn";
    button.textContent = university.name;
    button.dataset.index = index;

    button.addEventListener("click", () => {
      openModal(index);
    });

    container.appendChild(button);
  });
}

// Inicializar el carrusel
function initializeCarousel() {
  const carouselSlide = document.getElementById("carousel-slide");
  const carouselDots = document.getElementById("carousel-dots");

  // Crear elementos del carrusel
  universities.forEach((university, index) => {
    // Elemento del slide
    const slideItem = document.createElement("div");
    slideItem.className = "carousel-item";

    const img = document.createElement("img");
    img.src = university.banner;
    img.alt = university.name;

    const info = document.createElement("div");
    info.className = "carousel-info";
    info.innerHTML = `
                    <h3>${university.name}</h3>
                    <p>${university.country}</p>
                `;

    slideItem.appendChild(img);
    slideItem.appendChild(info);
    carouselSlide.appendChild(slideItem);

    // Puntos de navegación
    const dot = document.createElement("div");
    dot.className = "dot";
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index;

    dot.addEventListener("click", () => {
      goToSlide(index);
    });

    carouselDots.appendChild(dot);
  });

  // Configurar botones de navegación
  document.getElementById("prev-btn").addEventListener("click", () => {
    prevSlide();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    nextSlide();
  });
}

// Iniciar el carrusel automático
function startCarousel() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

// Navegar a una slide específica
function goToSlide(index) {
  const slides = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".dot");

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  currentSlide = index;

  document.querySelector(".carousel-slide").style.transform = `translateX(-${
    currentSlide * 100
  }%)`;

  // Actualizar dots activos
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");

  // Reiniciar el intervalo
  clearInterval(slideInterval);
  startCarousel();
}

// Slide siguiente
function nextSlide() {
  goToSlide(currentSlide + 1);
}

// Slide anterior
function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Inicializar el modal
function initializeModal() {
  const modal = document.getElementById("banner-modal");
  const closeBtn = document.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
}

// Abrir el modal con la información de la universidad
function openModal(index) {
  const university = universityPosts[index];
  const modal = document.getElementById("banner-modal");

  document.getElementById("modal-title").textContent = university.name;
  document.getElementById("modal-subtitle").textContent = university.country;
  document.getElementById("modal-image").src = university.banner;
  document.getElementById("modal-image").alt = `Banner de ${university.name}`;

  modal.classList.add("show");
}


// Función para toggle de sección desplegable
function setupCollapsibleSection() {
  const collapsibleHeader = document.querySelector('.collapsible-header');
  const collapsibleContent = document.querySelector('.collapsible-content');
  const toggleIcon = document.querySelector('.toggle-icon');
  
  collapsibleHeader.addEventListener('click', function() {
    collapsibleContent.classList.toggle('expanded');
    toggleIcon.textContent = collapsibleContent.classList.contains('expanded') ? '−' : '+';
  });
}

// Llamada a la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  setupCollapsibleSection();
});