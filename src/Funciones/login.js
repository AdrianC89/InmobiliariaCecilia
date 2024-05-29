document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Resetear mensaje de error
    errorMessage.classList.add('escondido');
    errorMessage.textContent = 'Error al iniciar sesión';
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = '/admin';
        } else {
            const result = await response.json();
            errorMessage.textContent = result.message || 'Error al iniciar sesión';
            errorMessage.classList.remove('escondido');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        errorMessage.textContent = 'Error al iniciar sesión';
        errorMessage.classList.remove('escondido');
    }
});