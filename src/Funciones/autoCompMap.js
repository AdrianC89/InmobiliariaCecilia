document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([-37.32874601356731, -59.13697524676664], 12); // Inicializa el mapa centrado en una ubicación específica

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([-37.32874601356731, -59.13697524676664], {
        draggable: true
    }).addTo(map);

    marker.on('dragend', function (e) {
        const position = marker.getLatLng();
        document.getElementById('coordenada1').value = position.lat;
        document.getElementById('coordenada2').value = position.lng;
    });

    const geocoder = L.Control.Geocoder.nominatim();
    const input = document.getElementById('direccionInput');
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('autocomplete-results');
    input.parentNode.appendChild(resultContainer);

    input.addEventListener('input', function () {
        const query = input.value;
        if (query.length > 2) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
                .then(response => response.json())
                .then(results => {
                    resultContainer.innerHTML = '';
                    results.forEach(result => {
                        const option = document.createElement('div');
                        option.classList.add('autocomplete-option');
                        option.textContent = result.display_name;
                        option.addEventListener('click', function () {
                            input.value = result.display_name;
                            resultContainer.innerHTML = '';
                            const latlng = [result.lat, result.lon];
                            marker.setLatLng(latlng);
                            map.setView(latlng, 15);
                            document.getElementById('coordenada1').value = latlng[0];
                            document.getElementById('coordenada2').value = latlng[1];
                        });
                        resultContainer.appendChild(option);
                    });
                });
        } else {
            resultContainer.innerHTML = '';
        }
    });
});