// Selección de elementos
const form = document.getElementById("form");
const tabla = document.getElementById("tabla");
let citas = JSON.parse(localStorage.getItem("citas")) || [];

// Función para guardar en localStorage
function guardarCitas() {
  localStorage.setItem("citas", JSON.stringify(citas));
}

// CREATE
form.addEventListener("submit", e => {
  e.preventDefault();
  const cita = {
    paciente: document.getElementById("paciente").value,
    telefono: document.getElementById("telefono").value,
    correo: document.getElementById("correo").value,
    nacimiento: document.getElementById("nacimiento").value,
    doctor: document.getElementById("doctor").value,
    fecha: document.getElementById("fecha").value,
    motivo: document.getElementById("motivo").value
  };
  citas.push(cita);
  guardarCitas();
  mostrarCitas();
  form.reset();
});

// READ
function mostrarCitas() {
  tabla.innerHTML = "";
  citas.forEach((cita, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${cita.paciente}</td>
        <td>${cita.telefono}</td>
        <td>${cita.correo}</td>
        <td>${cita.nacimiento}</td>
        <td>${cita.doctor}</td>
        <td>${cita.fecha}</td>
        <td>${cita.motivo}</td>
        <td>
          <button class="edit" onclick="editar(${index})">Editar</button>
          <button class="delete" onclick="borrar(${index})">Borrar</button>
        </td>
      </tr>`;
  });
}

// UPDATE
function editar(index) {
  // Rellenar formulario con datos existentes
  document.getElementById("paciente").value = citas[index].paciente;
  document.getElementById("telefono").value = citas[index].telefono;
  document.getElementById("correo").value = citas[index].correo;
  document.getElementById("nacimiento").value = citas[index].nacimiento;
  document.getElementById("doctor").value = citas[index].doctor;
  document.getElementById("fecha").value = citas[index].fecha;
  document.getElementById("motivo").value = citas[index].motivo;

  // Cambiar comportamiento del formulario para actualizar
  form.onsubmit = e => {
    e.preventDefault();
    citas[index] = {
      paciente: document.getElementById("paciente").value,
      telefono: document.getElementById("telefono").value,
      correo: document.getElementById("correo").value,
      nacimiento: document.getElementById("nacimiento").value,
      doctor: document.getElementById("doctor").value,
      fecha: document.getElementById("fecha").value,
      motivo: document.getElementById("motivo").value
    };
    guardarCitas();
    mostrarCitas();
    form.reset();
    // Restaurar comportamiento original
    form.onsubmit = defaultSubmit;
  };
}

// DELETE
function borrar(index) {
  citas.splice(index, 1);
  guardarCitas();
  mostrarCitas();
}

// Función original de submit (para restaurar después de editar)
function defaultSubmit(e) {
  e.preventDefault();
  const cita = {
    paciente: document.getElementById("paciente").value,
    telefono: document.getElementById("telefono").value,
    correo: document.getElementById("correo").value,
    nacimiento: document.getElementById("nacimiento").value,
    doctor: document.getElementById("doctor").value,
    fecha: document.getElementById("fecha").value,
    motivo: document.getElementById("motivo").value
  };
  citas.push(cita);
  guardarCitas();
  mostrarCitas();
  form.reset();
}

// Inicializar tabla al cargar
mostrarCitas();
