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