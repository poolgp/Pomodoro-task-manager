// Elements del DOM
const timerDisplay = document.getElementById("timer-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");
const studyBtn = document.getElementById("study-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const pendingTasks = document.getElementById("pending-tasks");
const inProgressTasks = document.getElementById("in-progress-tasks");
const completedTasks = document.getElementById("completed-tasks");

// Variables del temporitzador
let timer;
let isRunning = false;
let timeRemaining = 1500; // Temps per defecte (25 minuts)
let currentTimer = 1500; // Guardar el temps del temporitzador actual

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    startPauseBtn.textContent = "Començar";
  } else {
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        alert("Temps complet!");
      }
    }, 1000);
    startPauseBtn.textContent = "Pausar";
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timer);
  timeRemaining = currentTimer; // Reiniciar al temps del temporitzador actual
  updateTimerDisplay();
  startPauseBtn.textContent = "Començar";
  isRunning = false;
}

function setTimer(minutes) {
  clearInterval(timer);
  timeRemaining = minutes * 60;
  currentTimer = timeRemaining; // Actualitzar el temps del temporitzador actual
  updateTimerDisplay();
  startPauseBtn.textContent = "Començar";
  isRunning = false;
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
studyBtn.addEventListener("click", () => setTimer(25));
shortBreakBtn.addEventListener("click", () => setTimer(5));
longBreakBtn.addEventListener("click", () => setTimer(15));

function createTaskCard(title, desc, category, timestamp) {
  const taskCard = document.createElement("div");
  taskCard.className = `task-card ${category}`;
  taskCard.draggable = true;
  taskCard.innerHTML = `
    <h5>${title}</h5>
    <p>${desc}</p>
    <small>${category}</small><br>
    <small>${timestamp}</small>
    <button class="btn btn-danger btn-sm mt-2 delete-task-btn">Eliminar</button>
  `;
  taskCard.addEventListener("dragstart", handleDragStart);
  return taskCard;
}

addTaskBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Afegir Nova Tasca",
    html: `
      <input type="text" id="task-title" class="swal2-input" placeholder="Títol">
      <textarea id="task-desc" class="swal2-textarea" placeholder="Descripció"></textarea>
      <select id="task-category" class="swal2-select">
        <option value="none" selected>Cap</option>
        <option value="design">Disseny</option>
        <option value="frontend">Front-end</option>
        <option value="backend">Back-end</option>
      </select>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const title = Swal.getPopup().querySelector("#task-title").value;
      const desc = Swal.getPopup().querySelector("#task-desc").value;
      const category = Swal.getPopup().querySelector("#task-category").value;
      return { title, desc, category };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { title, desc, category } = result.value;
      const timestamp = new Date().toLocaleString();
      const taskCard = createTaskCard(title, desc, category, timestamp);
      pendingTasks.appendChild(taskCard);
    }
  });
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-task-btn")) {
    if (confirm("Segur que vols eliminar aquesta tasca?")) {
      event.target.closest(".task-card").remove();
    }
  }
});

function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.effectAllowed = "move";
}

function handleDrop(event) {
  event.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const taskCard = document.getElementById(id);
  event.target.appendChild(taskCard);
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

document.querySelectorAll(".task-column").forEach((column) => {
  column.addEventListener("dragover", handleDragOver);
  column.addEventListener("drop", (event) => {
    event.preventDefault();
    const taskCard = document.querySelector(".dragging");
    if (taskCard && column.contains(taskCard)) {
      return;
    }
    column.appendChild(taskCard);
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
