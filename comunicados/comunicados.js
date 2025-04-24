document.addEventListener('DOMContentLoaded', function () {
    // Manejo del menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (!menuToggle || !menu) {
        console.error('No se encontraron los elementos .menu-toggle o .menu');
    } else {
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
    }
});
