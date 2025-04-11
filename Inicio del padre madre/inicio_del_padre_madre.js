document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.carousel-indicators span');

    let currentIndex = 0;
    const totalItems = items.length;

    // Variables para el deslizamiento táctil
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // Distancia mínima para considerar un deslizamiento

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Mover al siguiente elemento
    function moveToNext() {
        currentIndex = (currentIndex + 1) % totalItems; // Ciclo al inicio si es el final
        updateCarousel();
    }

    // Mover al elemento anterior
    function moveToPrev() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Ciclo al final si es el inicio
        updateCarousel();
    }

    // Mover a un índice específico
    function moveToIndex(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Eventos de los botones
    nextBtn.addEventListener('click', moveToNext);
    prevBtn.addEventListener('click', moveToPrev);

    // Hacer clic en los indicadores para ir a una hoja específica
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToIndex(index);
        });
    });

    // Soporte para deslizamiento táctil
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX; // Guardar la posición inicial del toque
    });

    track.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX; // Actualizar la posición mientras se mueve
    });

    track.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;

        // Si el deslizamiento es mayor a la distancia mínima
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Deslizó a la derecha -> mover al anterior
                moveToPrev();
            } else {
                // Deslizó a la izquierda -> mover al siguiente
                moveToNext();
            }
        }
    });

    // Inicializar el carrusel
    updateCarousel();
});

// Manejo del menú hamburguesa (sin cambios)
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (!menuToggle || !menu) {
        console.error('No se encontraron los elementos .menu-toggle o .menu');
        return;
    }

    const toggleMenu = function (e) {
        e.preventDefault();
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
    };

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        menuToggle.addEventListener('touchstart', toggleMenu);
    } else {
        menuToggle.addEventListener('click', toggleMenu);
    }

    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    if (isTouchDevice) {
        document.addEventListener('touchstart', function (e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }
});