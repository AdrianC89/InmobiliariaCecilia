function initMap() {
    const input = document.getElementById('direccionInput');
    const options = {
        types: ['geocode'] // Limitar la búsqueda a direcciones
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    // Crear el mapa
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.603722, lng: -58.381592 }, // Centro inicial del mapa
        zoom: 12, // Zoom inicial
    });

    // Crear un marcador que se actualizará cuando se complete una dirección en el autocompletado
    const marker = new google.maps.Marker({
        map,
        draggable: true, // Permitir que el marcador se pueda arrastrar
    });

    // Listener para detectar el cambio en la dirección seleccionada
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
            console.error("No se ha encontrado la ubicación para el lugar proporcionado");
            return;
        }

        // Actualizar las coordenadas del marcador con la ubicación seleccionada
        const newPosition = place.geometry.location;
        marker.setPosition(newPosition);
        map.setCenter(newPosition);

        // Actualizar los campos de coordenadas
        document.getElementById('coordenada1').value = newPosition.lat();
        document.getElementById('coordenada2').value = newPosition.lng();
    });

    // Listener para detectar el movimiento del marcador y actualizar las coordenadas
    marker.addListener('dragend', function () {
        document.getElementById('coordenada1').value = marker.getPosition().lat();
        document.getElementById('coordenada2').value = marker.getPosition().lng();
    });
}

