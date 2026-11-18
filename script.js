
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("btnEnviar");

// Pega aquí la URL de tu aplicación web de Apps Script.
// Debe terminar en /exec, NO es el enlace de Google Sheets.
const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbz_xob_yzb5Qj6X0OsSX3XxuZqjXwANylb4O01CWOiYyygYV6ZJH6YkWjY-lKfEeczy8A/exec";

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    if (URL_APPS_SCRIPT === "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT") {
        mensaje.textContent = "Primero debes configurar la conexión.";
        mensaje.style.color = "red";
        return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const empresa = document.getElementById("empresa").value.trim();

    if (!nombre || !correo || !telefono || !empresa) {
        mensaje.textContent = "Complete todos los campos.";
        mensaje.style.color = "red";
        return;
    }

    // Preparar el envío al iframe oculto.
    formulario.action = URL_APPS_SCRIPT;
    formulario.method = "POST";
    formulario.target = "marcoEnvio";

    boton.disabled = true;
    boton.textContent = "Enviando...";
    mensaje.textContent = "";

    // Enviar el formulario a Google Apps Script.
    HTMLFormElement.prototype.submit.call(formulario);
});

// Recibir la respuesta de Google Apps Script.
window.addEventListener("message", function(event) {

    const resultado = event.data;

    if (!resultado || resultado.origen !== "FormularioQR") {
        return;
    }

    if (resultado.estado === "ok") {
        mensaje.textContent = "¡Registro enviado correctamente!";
        mensaje.style.color = "green";
        formulario.reset();
    } else {
        mensaje.textContent = resultado.mensaje || "No se pudo guardar el registro.";
        mensaje.style.color = "red";
    }

    boton.disabled = false;
    boton.textContent = "Enviar registro";
});
