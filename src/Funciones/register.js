document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Resetear mensaje de error
    errorMessage.classList.add('escondido');
    errorMessage.textContent = 'Error al registrarse';

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            window.location.href = '/admin';
        } else {
            const result = await response.json();
            errorMessage.textContent = result.error || 'Error al registrarse';
            errorMessage.classList.remove('escondido');
        }
    } catch (error) {
        console.error('Error al registrarse:', error);
        errorMessage.textContent = 'Error al registrarse';
        errorMessage.classList.remove('escondido');
    }
});