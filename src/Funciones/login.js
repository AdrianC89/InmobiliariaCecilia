// Define la URL base de tu API
let baseUrl;
if (process.env.NODE_ENV === 'production') {
  // Si estás en producción, utiliza la URL del servidor en la nube
  baseUrl = 'https://inmobiliariacecilia.onrender.com/';
} else {
  // Si estás en desarrollo, utiliza localhost en el puerto 3001
  baseUrl = 'http://localhost:3001';
}

// Agrega el event listener al formulario de inicio de sesión
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = e.target.children.user.value;
    const password = e.target.children.password.value; 

    try {
        // Usa la URL base en tu solicitud fetch
        const res = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user,
                password
            })
        });

        if (!res.ok) {
            mensajeError.classList.toggle("escondido", false);
            return;
        }

        const resJson = await res.json();
        if (resJson.redirect){
            window.location.href = resJson.redirect;
        }
    } catch (error) {
        console.error('Error al realizar la solicitud fetch:', error);
        // Maneja el error según sea necesario
    }
});
