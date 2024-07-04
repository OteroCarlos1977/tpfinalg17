document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const fields = {
        nombre: 'El nombre es obligatorio',
        apellido: 'El apellido es obligatorio',
        email: 'El correo electrónico no es válido',
        usuario: 'El usuario es obligatorio',
        password: 'La contraseña es obligatoria'
        
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío por defecto del formulario

        if (validateForm()) {
            console.log('El formulario es válido. Enviar datos...');
            const formData = new FormData(form);
            const data = {
                id:0,
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                email: formData.get('email'),
                usuario: formData.get('usuario'),
                password: formData.get('password'),
                rol_id: 2
            };

            try {
                const respuesta = await fetch('http://localhost:3000/api/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });

                const respuestaJson = await respuesta.json();
                if (respuesta.ok) {
                    alert("Usuario Registrado con Éxito");
                    form.reset();
                    window.location.href = '../index.html';
                } else {
                    alert("Hubo un error al registrar el usuario");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Hubo un error al registrar el usuario");
            }
        } else {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
        }
    });

    const validateForm = () => {
        let isValid = true;

        for (const [fieldId, errorMessage] of Object.entries(fields)) {
            if (fieldId === 'email') {
                isValid = validateEmailField(fieldId, errorMessage) && isValid;
            } else if (fieldId === 'terminos') {
                isValid = validateCheckboxField(fieldId, errorMessage) && isValid;
            } else {
                isValid = validateField(fieldId, errorMessage) && isValid;
            }
        }

        return isValid;
    };

    const validateField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        if (value === '') {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const validateEmailField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const email = field.value.trim();
        if (email === '') {
            setErrorFor(field, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const validateCheckboxField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        if (!field.checked) {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const setErrorFor = (input, message) => {
        const formControl = input.closest('div');
        const errorText = formControl.querySelector('.error-text');
        formControl.classList.add('error');
        errorText.innerText = message;
        input.focus();
    };

    const setSuccessFor = (input) => {
        const formControl = input.closest('div');
        formControl.classList.remove('error');
        const errorText = formControl.querySelector('.error-text');
        errorText.innerText = '';
    };

    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value.trim();
            if (value !== '') {
                setSuccessFor(input);
            }
        });
    });

    form.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => {
            const value = select.value;
            if (value !== '') {
                setSuccessFor(select);
            }
        });
    });

    form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                setSuccessFor(checkbox);
            }
        });
    });
});
