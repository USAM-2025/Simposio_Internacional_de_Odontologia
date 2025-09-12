// Variables globales
let currentSlide = 0;
let slideInterval;

// Inicializar la página cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
    initializeCountdown();
    initializeCarousel();
    initializeModal();
    setupScrollAnimations();
    startCarousel();
    setupPosterDownloads();
    setupCollapsibleSection();
});

// Configurar animaciones de scroll
function setupScrollAnimations() {
    const sections = document.querySelectorAll(
        ".collapsible-section, .sponsors-section, .program-section, .countdown-section, .posters-section, .carousel-section, .online-sessions, .location-section, .institutions-section"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    // Opcional: remover la clase visible cuando el elemento ya no es visible
                    // entry.target.classList.remove("visible");
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

// Inicializar el carrusel
function initializeCarousel() {
    const carouselSlide = document.getElementById("carousel-slide");
    const carouselDots = document.getElementById("carousel-dots");
    
    // Obtener todos los elementos del carrusel
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    // Crear puntos de navegación según la cantidad de elementos
    carouselItems.forEach((_, index) => {
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
    const slides = document.querySelectorAll(".carousel-item");
    goToSlide(currentSlide + 1);
}

// Slide anterior
function prevSlide() {
    const slides = document.querySelectorAll(".carousel-item");
    goToSlide(currentSlide - 1);
}

// Inicializar el modal
function initializeModal() {
    const modal = document.getElementById("banner-modal");
    const closeBtn = document.querySelector(".close-btn");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
}

// Función para toggle de sección desplegable (corregida)
function setupCollapsibleSection() {
    const collapsibleHeader = document.querySelector('.collapsible-header');
    const collapsibleContent = document.querySelector('.collapsible-content');
    const toggleIcon = document.querySelector('.toggle-icon');
    
    if (collapsibleHeader && collapsibleContent && toggleIcon) {
        // Inicialmente colapsado
        collapsibleContent.classList.remove('expanded');
        toggleIcon.textContent = '+';
        
        collapsibleHeader.addEventListener('click', function() {
            collapsibleContent.classList.toggle('expanded');
            toggleIcon.textContent = collapsibleContent.classList.contains('expanded') ? '−' : '+';
        });
    }
}

// Configurar descargas de posters
function setupPosterDownloads() {
    const posterItems = document.querySelectorAll('.poster-item');
    
    posterItems.forEach(item => {
        item.addEventListener('click', function() {
            const posterFile = this.getAttribute('data-poster');
            if (posterFile) {
                // Crear un enlace temporal para descargar el archivo
                const link = document.createElement('a');
                link.href = posterFile;
                link.download = posterFile.split('/').pop();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    });
}