const formulario = document.getElementById("formulario");
const tipoSolicitud = document.getElementById("tipoSolicitud");

const campoAusencia = document.getElementById("campoAusencia");
const campoReunion = document.getElementById("campoReunion");
const campoApoyo = document.getElementById("campoApoyo");

const mensajeRespuesta = document.getElementById("mensajeRespuesta");
const resumen = document.getElementById("resumen");
const datosResumen = document.getElementById("datosResumen");

tipoSolicitud.addEventListener("change", function () {
  campoAusencia.style.display = "none";
  campoReunion.style.display = "none";
  campoApoyo.style.display = "none";

  if (tipoSolicitud.value === "Justificación de ausencia") {
    campoAusencia.style.display = "block";
  }

  if (
    tipoSolicitud.value === "Reunión con docente" ||
    tipoSolicitud.value === "Reunión con orientación"
  ) {
    campoReunion.style.display = "block";
  }

  if (tipoSolicitud.value === "Apoyo educativo") {
    campoApoyo.style.display = "block";
  }
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const identificacion = document.getElementById("identificacion").value.trim();
  const edad = document.getElementById("edad").value.trim();
  const nivel = document.getElementById("nivel").value;
  const seccion = document.getElementById("seccion").value.trim();
  const jornada = document.getElementById("jornada").value;

  const encargado = document.getElementById("encargado").value.trim();
  const parentesco = document.getElementById("parentesco").value;
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();

  const solicitud = document.getElementById("tipoSolicitud").value;
  const urgencia = document.getElementById("urgencia").value;
  const detalle = document.getElementById("detalle").value.trim();

  const autorizacion = document.getElementById("autorizacion").checked;
  const veracidad = document.getElementById("veracidad").checked;

  if (
    nombre === "" ||
    identificacion === "" ||
    edad === "" ||
    nivel === "" ||
    seccion === "" ||
    jornada === "" ||
    encargado === "" ||
    parentesco === "" ||
    telefono === "" ||
    correo === "" ||
    solicitud === "" ||
    urgencia === "" ||
    detalle === ""
  ) {
    mostrarMensaje("Por favor complete todos los campos obligatorios.", "error");
    resumen.style.display = "none";
    return;
  }

  if (edad < 5 || edad > 80) {
    mostrarMensaje("La edad debe estar entre 5 y 80 años.", "error");
    resumen.style.display = "none";
    return;
  }

  if (!validarCorreo(correo)) {
    mostrarMensaje("Digite un correo electrónico válido.", "error");
    resumen.style.display = "none";
    return;
  }

  if (solicitud === "Justificación de ausencia") {
    const fechaAusencia = document.getElementById("fechaAusencia").value;
    const motivoAusencia = document.getElementById("motivoAusencia").value.trim();

    if (fechaAusencia === "" || motivoAusencia === "") {
      mostrarMensaje("Complete la fecha y el motivo de la ausencia.", "error");
      resumen.style.display = "none";
      return;
    }
  }

  if (
    solicitud === "Reunión con docente" ||
    solicitud === "Reunión con orientación"
  ) {
    const fechaReunion = document.getElementById("fechaReunion").value;
    const horaReunion = document.getElementById("horaReunion").value;

    if (fechaReunion === "" || horaReunion === "") {
      mostrarMensaje("Complete la fecha y hora sugerida para la reunión.", "error");
      resumen.style.display = "none";
      return;
    }
  }

  if (!autorizacion || !veracidad) {
    mostrarMensaje("Debe aceptar las autorizaciones para enviar el formulario.", "error");
    resumen.style.display = "none";
    return;
  }

  let areasApoyo = [];
  const checkboxes = campoApoyo.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function (check) {
    areasApoyo.push(check.value);
  });

  mostrarMensaje("Formulario enviado correctamente. La solicitud fue registrada.", "exito");

  datosResumen.innerHTML = `
    <strong>Estudiante:</strong> ${nombre}<br>
    <strong>Identificación:</strong> ${identificacion}<br>
    <strong>Edad:</strong> ${edad} años<br>
    <strong>Nivel:</strong> ${nivel}<br>
    <strong>Sección:</strong> ${seccion}<br>
    <strong>Jornada:</strong> ${jornada}<br><br>

    <strong>Encargado:</strong> ${encargado}<br>
    <strong>Parentesco:</strong> ${parentesco}<br>
    <strong>Teléfono:</strong> ${telefono}<br>
    <strong>Correo:</strong> ${correo}<br><br>

    <strong>Tipo de solicitud:</strong> ${solicitud}<br>
    <strong>Nivel de urgencia:</strong> ${urgencia}<br>
    <strong>Áreas de apoyo:</strong> ${areasApoyo.length > 0 ? areasApoyo.join(", ") : "No aplica"}<br>
    <strong>Detalle:</strong> ${detalle}
  `;

  resumen.style.display = "block";
});

formulario.addEventListener("reset", function () {
  mensajeRespuesta.style.display = "none";
  resumen.style.display = "none";
  campoAusencia.style.display = "none";
  campoReunion.style.display = "none";
  campoApoyo.style.display = "none";
});

function mostrarMensaje(texto, tipo) {
  mensajeRespuesta.textContent = texto;
  mensajeRespuesta.className = "mensaje " + tipo;
  mensajeRespuesta.style.display = "block";
}

function validarCorreo(correo) {
  const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresion.test(correo);
}
  