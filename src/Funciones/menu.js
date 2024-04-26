document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('menu-icon');
    var menuItems = document.getElementById('encabezado-nav');

    menuIcon.addEventListener('click', function() {
        if (menuItems.style.display === 'none' || menuItems.style.display === '') {
            menuItems.style.display = 'flex';
            menuItems.style.wrap = 'nowrap';
            menuItems.style.direction = 'column';
            menuItems.style.position = 'sticky';
        } else {
            menuItems.style.display = 'none';
        }
    });
});

window.addEventListener('scroll', function() {
    var encabezado = document.getElementById('encabezado');
    var encabezadoNav = document.getElementById('encabezado-nav');
    var encabezadoAltura = encabezado.offsetHeight;
    var viewportWidth = window.innerWidth;

    if (window.pageYOffset > encabezadoAltura && viewportWidth >= 600) {
        encabezadoNav.style.position = 'fixed';
        encabezadoNav.style.top = '0';
    } else {
        encabezadoNav.style.position = 'static';
    }
});