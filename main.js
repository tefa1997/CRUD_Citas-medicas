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

  // Animación suave
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
const tablaContainer = document.getElementById("tabla-container");

let citas = JSON.parse(localStorage.getItem("citas")) || [];

function renderTabla() {
  tabla.innerHTML = "";
  citas.forEach((cita, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cita.paciente}</td>
      <td>${cita.telefono}</td>
      <td>${cita.email}</td>
      <td>${cita.nacimiento}</td>
      <td>${cita.direccion}</td>
      <td>${cita.especialidad}</td>
      <td>${cita.doctor}</td>
      <td>${cita.fecha}</td>
      <td>${cita.motivo}</td>
      <td>
        <button onclick="editarCita(${index})">✏️</button>
        <button onclick="eliminarCita(${index})">🗑️</button>
      </td>
    `;
    tabla.appendChild(row);
  });
  tablaContainer.style.display = citas.length > 0 ? "block" : "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevaCita = {
    paciente: document.getElementById("paciente").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("email").value,
    nacimiento: document.getElementById("nacimiento").value,
    direccion: document.getElementById("direccion").value,
    especialidad: document.getElementById("especialidad").value,
    doctor: document.getElementById("doctor").value,
    fecha: document.getElementById("fecha").value,
    motivo: document.getElementById("motivo").value,
    estado: document.getElementById("estado") ? document.getElementById("estado").value : "Pendiente"
  };
  citas.push(nuevaCita);
  localStorage.setItem("citas", JSON.stringify(citas));
  renderTabla();
  form.reset();
});

function eliminarCita(index) {
  citas.splice(index, 1);
  localStorage.setItem("citas", JSON.stringify(citas));
  renderTabla();
}

function editarCita(index) {
  const cita = citas[index];
  document.getElementById("paciente").value = cita.paciente;
  document.getElementById("telefono").value = cita.telefono;
  document.getElementById("email").value = cita.email;
  document.getElementById("nacimiento").value = cita.nacimiento;
  document.getElementById("direccion").value = cita.direccion;
  document.getElementById("especialidad").value = cita.especialidad;
  document.getElementById("doctor").value = cita.doctor;
  document.getElementById("fecha").value = cita.fecha;
  document.getElementById("motivo").value = cita.motivo;
  if (document.getElementById("estado")) {
    document.getElementById("estado").value = cita.estado;
  }
  eliminarCita(index); // se reemplaza al guardar
}

renderTabla();

// -------------------- Swiper (si usas carrusel en servicios) --------------------
const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: { delay: 3000 },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});



