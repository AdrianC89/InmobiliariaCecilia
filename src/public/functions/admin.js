document.getElementById("button-exit").addEventListener("click",()=>{
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.href = "/"
})
document.addEventListener("DOMContentLoaded", function() {
    const panelControl = document.querySelector('.panelControl');
    const entrada = document.querySelector('.entrada');
    const menuControl = document.querySelector('#menu-control');

    entrada.addEventListener('click', function() {
        panelControl.classList.toggle('expanded');
    });
});