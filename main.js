// -------------------- Mostrar información de servicios --------------------
function mostrarInfo(servicio) {
  const infoBox = document.getElementById("info-servicio");
  let contenido = "";

  switch (servicio) {
    case "hospitalizacion":
      contenido = "<h3>Hospitalización</h3><p>Habitaciones cómodas y atención médica continua.</p>";
      break;
    case "laboratorio":
      contenido = "<h3>Laboratorio Clínico</h3><p>Realizamos análisis de sangre, orina y pruebas especializadas.</p>";
      break;
    case "odontologia":
      contenido = "<h3>Odontología</h3><p>Tratamientos dentales, limpieza y ortodoncia.</p>";
      break;
    case "ginecologia":
      contenido = "<h3>Ginecología</h3><p>Atención especializada para la salud femenina.</p>";
      break;
    case "pediatria":
      contenido = "<h3>Pediatría</h3><p>Cuidado médico integral para niños y adolescentes.</p>";
      break;
    case "dermatologia":
      contenido = "<h3>Dermatología</h3><p>Tratamientos para el cuidado y salud de la piel.</p>";
      break;
    case "medicina-general":
      contenido = "<h3>Medicina General</h3><p>Consultas médicas para tu bienestar diario.</p>";
      break;
    case "imagenologia":
      contenido = "<h3>Imagenología</h3><p>Rayos X y estudios de imagen para diagnóstico preciso.</p>";
      break;
    default:
      contenido = "<p>Selecciona un servicio para ver más información.</p>";
  }

  infoBox.style.opacity = 0;
  setTimeout(() => {
    infoBox.innerHTML = contenido;
    infoBox.style.opacity = 1;
    infoBox.style.transition = "opacity 0.5s ease-in-out";
  }, 200);
}

// -------------------- CRUD de citas médicas --------------------
const form = document.getElementById("form-citas");
const tabla = document.getElementById("tabla-citas");

let citas = JSON.parse(localStorage.getItem("citas")) || [];

// Renderizar citas
function renderCitas() {
  tabla.innerHTML = "";
  citas.forEach((cita, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><i class="fa-solid fa-user"></i> <strong>Paciente:</strong> ${cita.paciente}</td>
      <td><i class="fa-solid fa-phone"></i> <strong>Teléfono:</strong> ${cita.telefono}</td>
      <td><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> ${cita.email}</td>
      <td><i class="fa-solid fa-calendar-days"></i> <strong>Fecha:</strong> ${cita.fecha}</td>
      <td><i class="fa-solid fa-clock"></i> <strong>Hora:</strong> ${cita.hora}</td>
      <td><i class="fa-solid fa-notes-medical"></i> <strong>Motivo:</strong> ${cita.motivo}</td>
      <td><i class="fa-solid fa-clipboard-check"></i> <strong>Estado:</strong> ${cita.estado}</td>
      <td>
        <button onclick="editarCita(${index})"><i class="fa-solid fa-pen"></i></button>
        <button onclick="eliminarCita(${index})"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Guardar nueva cita
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevaCita = {
    paciente: document.getElementById("paciente").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("email").value,
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    motivo: document.getElementById("motivo").value,
    estado: document.getElementById("estado") ? document.getElementById("estado").value : "Pendiente"
  };

  citas.push(nuevaCita);
  localStorage.setItem("citas", JSON.stringify(citas));
  renderCitas();
  form.reset();
});

// Eliminar cita
function eliminarCita(index) {
  citas.splice(index, 1);
  localStorage.setItem("citas", JSON.stringify(citas));
  renderCitas();
}

// Editar cita
function editarCita(index) {
  const cita = citas[index];
  document.getElementById("paciente").value = cita.paciente;
  document.getElementById("telefono").value = cita.telefono;
  document.getElementById("email").value = cita.email;
  document.getElementById("fecha").value = cita.fecha;
  document.getElementById("hora").value = cita.hora;   
  document.getElementById("motivo").value = cita.motivo;
  if (document.getElementById("estado")) {
    document.getElementById("estado").value = cita.estado;
  }
  eliminarCita(index); // se reemplaza al guardar
}

// Render inicial
renderCitas();


