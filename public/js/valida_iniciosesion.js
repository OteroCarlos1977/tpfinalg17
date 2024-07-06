// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el formulario en el DOM
  const form = document.getElementById("loginForm");

  // Agrega un evento de escucha para cuando se envía el formulario
  form.addEventListener("submit", async (event) => {
    // Evita que el formulario se envíe
    event.preventDefault();

    if (validateForm()) {
      console.log("El formulario es válido. Enviar Datos.");

      const dataForm = new FormData(form);
      const data = {
        usuario: dataForm.get("usuario"),
        password: dataForm.get("password"),
      };

      try {
        const respuesta = await fetch(`${window.location.origin}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const respuestaJson = await respuesta.json();
        console.log(respuesta);
        console.log(respuestaJson);

        if (data.usuario === "admin") {
          alert("Bienvenido administrador");
          window.location.href = "../administrar.html";
        } else if (data.usuario !== "admin") {
          alert("Bienvenido usuario: " + data.usuario);
          window.location.href = "../principal.html";
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Hubo un error al realizar la solicitud");
      }
    } else {
      console.log(
        "El formulario no es válido. Por favor, corrige los errores."
      );
    }
  });

  // Función para validar todo el formulario
  const validateForm = () => {
    let isValid = true;
    isValid = validateField("usuario", "El usuario es obligatorio") && isValid; // Validar campo de usuario
    isValid =
      validateField("password", "La contraseña es obligatoria") && isValid; // Validar campo de contraseña
    return isValid;
  };

  // Función para validar un campo específico
  const validateField = (fieldId, errorMessage) => {
    const field = document.getElementById(fieldId); // Obtiene el elemento del campo mediante su ID
    const value = field.value.trim(); // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
    // Si el valor del campo está vacío
    if (value === "") {
      setErrorFor(field, errorMessage); // Establece un mensaje de error para el campo
      return false; // Devuelve false indicando que la validación ha fallado
    } else {
      setSuccessFor(field); // Si el valor del campo no está vacío, elimina cualquier mensaje de error anterior
      return true; // Devuelve true indicando que la validación ha tenido éxito
    }
  };

  // Función para establecer un mensaje de error en un campo
  const setErrorFor = (input, message) => {
    // Encuentra el elemento padre del campo de entrada
    const formControl = input.closest("div");
    // Encuentra el elemento de texto de error dentro del elemento padre
    const errorText = formControl.querySelector(".error-text");
    // Agrega la clase de error al elemento padre para resaltar el campo
    formControl.classList.add("error");
    // Establece el texto del mensaje de error
    errorText.innerText = message;
    // Establece el foco en el campo de entrada para una corrección rápida
    input.focus();
  };

  // Función para eliminar un mensaje de error de un campo
  const setSuccessFor = (input) => {
    // Encuentra el elemento padre del campo de entrada
    const formControl = input.closest("div");
    // Elimina la clase de error del elemento padre
    formControl.classList.remove("error");
    // Encuentra el elemento de texto de error dentro del elemento padre
    const errorText = formControl.querySelector(".error-text");
    // Establece el texto de error como vacío
    errorText.innerText = "";
  };

  // Agrega eventos para borrar las clases de error cuando se completa el input
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const value = input.value.trim();
      if (value !== "") {
        setSuccessFor(input);
      }
    });
  });
});
