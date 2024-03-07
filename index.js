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

      const newTaskElement = document.createElement("div");
      newTaskElement.classList.add("task");

      newTaskElement.innerHTML = `
      <h4 class = "taskH4">${taskName}</h4>
      <p class = "taskP">${taskDescription}</p>
      <br/>
      <button class="taskInfo">
      <i class="fa-solid fa-circle-info"></i>
      </button>
      <button class="taskDelete">
      <i class="fa-solid fa-trash-can"></i>
      </button>
      `;

      // guardarLocalString();

      const pendentTasksContainer = document.getElementById("tasquesPendents");
      pendentTasksContainer.appendChild(newTaskElement);
    },
  });
}

// guardarLocalString();