// function newTasca() {
//   Swal.fire({
//     title: "Create New Task",
//     html:
//       '<input id="task-name" class="swal2-input" placeholder="Task Name">' +
//       '<textarea id="task-description" class="swal2-textarea" placeholder="Task Description"></textarea>',
//     showCancelButton: true,
//     confirmButtonText: "Create Task",
//     cancelButtonText: "Cancel",
//     focusConfirm: false,
//     preConfirm: () => {
//       const taskName = Swal.getPopup().querySelector("#task-name").value;
//       const taskDescription =
//         Swal.getPopup().querySelector("#task-description").value;
//       console.log("Task Name:", taskName);
//       console.log("Task Description:", taskDescription);
//     },
//   });
// }

function newTasca() {
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
      console.log("Task Name:", taskName);
      console.log("Task Description:", taskDescription);

      // Crear un nuevo elemento div para representar la tarea
      const newTaskElement = document.createElement("div");
      newTaskElement.classList.add("task");

      // Asignar el nombre y la descripción como contenido del nuevo elemento
      newTaskElement.innerHTML = `
      <h4 class="taskH4">${taskName}</h4>
      <p class="taskP">${taskDescription}</p>
      <button
      <hr/>

      `;

      

      // Agregar la tarea al contenedor de tareas pendientes
      const pendentTasksContainer = document.getElementById("tasquesPendents");
      pendentTasksContainer.appendChild(newTaskElement);
    },
  });
}
