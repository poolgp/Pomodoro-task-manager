const pantallaTemporitzador = document.getElementById("pantalla-temporitzador");
const btnIniciarPausar = document.getElementById("btn-iniciar-pausar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnEstudi = document.getElementById("btn-estudi");
const btnPausaCurta = document.getElementById("btn-pausa-curta");
const btnPausaLlarga = document.getElementById("btn-pausa-llarga");
const btnAfegirTasca = document.getElementById("btn-afegir-tasca");
const tasquesPendents = document.getElementById("tasques-pendents");
const tasquesEnProgres = document.getElementById("tasques-en-progres");
const tasquesCompletes = document.getElementById("tasques-completes");

let temporitzador;
let enExecucio = false;
let tempsRestant = 1500;
let tempsActual = 1500;

//Funcion que hace funcionar el temporizador
function actualitzaPantallaTemporitzador() {
  const minuts = Math.floor(tempsRestant / 60);
  const segons = tempsRestant % 60;
  pantallaTemporitzador.textContent = `${minuts < 10 ? "0" : ""}${minuts}:${
    segons < 10 ? "0" : ""
  }${segons}`;
}

//Funcion para iniciar y pausar el temporizador
function iniciarPausarTemporitzador() {
  if (enExecucio) {
    clearInterval(temporitzador);
    btnIniciarPausar.textContent = "Començar";
  } else {
    temporitzador = setInterval(() => {
      if (tempsRestant > 0) {
        tempsRestant--;
        actualitzaPantallaTemporitzador();
      } else {
        clearInterval(temporitzador);
        alert("Temps complet!");
      }
    }, 1000);
    btnIniciarPausar.textContent = "Pausar";
  }
  enExecucio = !enExecucio;
}

//Funcion para reinicar el temporizador
function reiniciarTemporitzador() {
  clearInterval(temporitzador);
  tempsRestant = tempsActual;
  actualitzaPantallaTemporitzador();
  btnIniciarPausar.textContent = "Començar";
  enExecucio = false;
}

//Funcion para establecer el tiempo a segundos
function establirTemporitzador(minuts) {
  clearInterval(temporitzador);
  tempsRestant = minuts * 60;
  tempsActual = tempsRestant;
  actualitzaPantallaTemporitzador();
  btnIniciarPausar.textContent = "Començar";
  enExecucio = false;
}

btnIniciarPausar.addEventListener("click", iniciarPausarTemporitzador);
btnReiniciar.addEventListener("click", reiniciarTemporitzador);
btnEstudi.addEventListener("click", () => establirTemporitzador(25));
btnPausaCurta.addEventListener("click", () => establirTemporitzador(5));
btnPausaLlarga.addEventListener("click", () => establirTemporitzador(15));

//Funcion que crea la tasca en la columna "to do"
function crearTasca(titol, desc, categoria, timestamp) {
  const tarjetaTasca = document.createElement("div");
  tarjetaTasca.className = `task-card ${categoria}`;
  tarjetaTasca.draggable = true;
  tarjetaTasca.innerHTML = `
    <h5>${titol}</h5>
    <p>${desc}</p>
    <small>${categoria}</small><br>
    <small>${timestamp}</small>
    <button class="btn btn-danger btn-sm mt-2 eliminar-tasca-btn">Eliminar</button>
  `;
  tarjetaTasca.addEventListener("dragstart", manejarArrossegamentInici);
  return tarjetaTasca;
}

btnAfegirTasca.addEventListener("click", () => {
  Swal.fire({
    title: "Afegir Nova Tasca",
    html: `
      <input type="text" id="titol-tasca" class="swal2-input" placeholder="Títol">
      <textarea id="desc-tasca" class="swal2-textarea" placeholder="Descripció"></textarea>
      <select id="categoria-tasca" class="swal2-select">
        <option value="none" selected>Cap</option>
        <option value="design">Disseny</option>
        <option value="frontend">Front-end</option>
        <option value="backend">Back-end</option>
      </select>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const titol = Swal.getPopup().querySelector("#titol-tasca").value;
      const desc = Swal.getPopup().querySelector("#desc-tasca").value;
      const categoria = Swal.getPopup().querySelector("#categoria-tasca").value;
      return { titol, desc, categoria };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { titol, desc, categoria } = result.value;
      const timestamp = new Date().toLocaleString();
      const tarjetaTasca = crearTasca(titol, desc, categoria, timestamp);
      tasquesPendents.appendChild(tarjetaTasca);
    }
  });
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("eliminar-tasca-btn")) {
    if (confirm("Segur que vols eliminar aquesta tasca?")) {
      event.target.closest(".task-card").remove();
    }
  }
});

//Funcion que controla el arrastrar 
function manejarArrossegamentInici(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.effectAllowed = "move";
}

//Funcion que controla el drop
function manejarDeixar(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  const tarjetaTasca = document.getElementById(id);
  event.target.appendChild(tarjetaTasca);
}

function manejarArrossegamentSobre(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

document.querySelectorAll(".task-column").forEach((columna) => {
  columna.addEventListener("dragover", manejarArrossegamentSobre);
  columna.addEventListener("drop", (event) => {
    event.preventDefault();
    const tarjetaTasca = document.querySelector(".dragging");
    if (tarjetaTasca && columna.contains(tarjetaTasca)) {
      return;
    }
    columna.appendChild(tarjetaTasca);
  });
});

document.addEventListener("dragstart", (event) => {
  if (event.target.classList.contains("task-card")) {
    event.target.classList.add("dragging");
  }
});

document.addEventListener("dragend", (event) => {
  if (event.target.classList.contains("task-card")) {
    event.target.classList.remove("dragging");
  }
});
