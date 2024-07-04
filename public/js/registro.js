document.addEventListener('DOMContentLoaded', () => {
    const crearUsuario = document.getElementById('registro');

    crearUsuario.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(crearUsuario);
        const data = {
            id: 0,
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            email: formData.get('email'),
            usuario: formData.get('usuario'),
            password: formData.get('password'),
            rol_id: 2
        }

        const respuesta = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const respuestaJson = await respuesta.json();
        if (respuesta.ok) {
            alert("Usuario Registrado con Éxito");
            crearUsuario.reset();
            window.location.href = 'index.html';
        } else {
            alert("Hubo un error al registrar el usuario");
        }
    });
});