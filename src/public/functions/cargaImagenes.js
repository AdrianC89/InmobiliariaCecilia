  // Obtener el campo de entrada de archivos y el botón de agregar imágenes
  const input = document.getElementById('imagenes');
  const agregarImagenBtn = document.getElementById('agregarImagen');
  
  // Agregar un evento click al botón de agregar imágenes
  agregarImagenBtn.addEventListener('click', function() {
      // Crear un nuevo campo de entrada de archivos
      const newInput = document.createElement('input');
      newInput.type = 'file';
      newInput.className = 'form-control';
      newInput.name = 'image';
      newInput.multiple = true;
      newInput.required = true;
  
      // Insertar el nuevo campo de entrada antes del botón de agregar imágenes
      input.parentNode.insertBefore(newInput, agregarImagenBtn);
  });
  
  // Agregar un evento change al campo de entrada de archivos para detectar cuando se seleccionan archivos
  input.addEventListener('change', function(event) {
      // Obtener la lista de archivos seleccionados
      const files = event.target.files;
      
      // Obtener el formulario
      const form = document.querySelector('form');
  
      // Iterar sobre cada archivo seleccionado
      for (const file of files) {
          // Crear un nuevo campo de entrada oculto para cada archivo seleccionado
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = 'image'; // Nombre del campo en el formulario
          hiddenInput.value = file.name; // Valor del campo (nombre del archivo)
          
          // Agregar el campo oculto al formulario
          form.appendChild(hiddenInput);
      }
  });
  