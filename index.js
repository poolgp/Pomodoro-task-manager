document.addEventListener("DOMContentLoaded", function newTasca() {
  Swal.fire({
    title: "Create New Task",
    html:
      '<input id="task-name" class="swal2-input" placeholder="Task Name">' +
      '<textarea id="task-description" class="swal2-textarea" placeholder="Task Description"></textarea>',
    showCancelButton: true,
    confirmButtonText: "Create Task",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    preConfirm: () => {
      const taskName = Swal.getPopup().querySelector("#task-name").value;
      const taskDescription =
        Swal.getPopup().querySelector("#task-description").value;

      // Guardar la tarea en el localStorage
      const task = {
        name: taskName,
        description: taskDescription,
      };

      // Obtener las tareas existentes del localStorage
      let existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      // Agregar la nueva tarea a la lista
      existingTasks.push(task);

      // Guardar la lista actualizada en el localStorage
      localStorage.setItem("tasks", JSON.stringify(existingTasks));

      console.log("Task Name:", taskName);
      console.log("Task Description:", taskDescription);

      const newTaskElement = document.createElement("div");
      newTaskElement.classList.add("task");

      newTaskElement.innerHTML = `
      <h4 class = "taskH4">${taskName}</h4>
      <p class = "taskP">${taskDescription}</p>
      <br/>
      <div class="buttons">
      <a class="taskInfo" id="taskInfo">
      <i class="fa-solid fa-circle-info"></i>
      </a>
      <a class="taskDelete" id="taskDelete">
      <i class="fa-solid fa-trash-can"></i>
      </a>
      </div>
      `;

      // guardarLocalString();

      /*
      <div class="buttons">
      <a href="#" class="taskInfo" id="taskInfo" onclick="#">
      <i class="fa-solid fa-circle-info"></i>
      </a>
      <a href="#" class="taskDelete" id="taskDelete" onclick="#">
      <i class="fa-solid fa-trash-can"></i>
      </a>
      </div>
      */

      const pendentTasksContainer = document.getElementById("tasquesPendents");
      pendentTasksContainer.appendChild(newTaskElement);
    },
  });


function getTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}
}