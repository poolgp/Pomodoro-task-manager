document.addEventListener("DOMContentLoaded", function () {
  ////////////////////////////////////////
  //TIMER/////////////////////////////////
  ////////////////////////////////////////

  // Tiempo inicial en minutos
  let tiempoSeleccionado = 25;

  const contador = document.querySelector(".tiempo");
  const estudiarBtn = document.querySelector(".estudiar");
  const llargaBtn = document.querySelector(".llarga");
  const curtaBtn = document.querySelector(".curta");
  const playPauseBtn = document.querySelector(".playPause");
  const newTaskBtn = document.querySelector(".newTask");

  // Selecciono la columna donde quiero que se cree la tarea
  const pendentColumn = document.querySelector(".columna1 .cuerpoColumna");

  // Función para actualizar el contador de tiempo en el span
  function actualizarContador(tiempo) {
    contador.textContent = `${tiempo}:00`;
  }

  estudiarBtn.addEventListener("click", function () {
    tiempoSeleccionado = 25;
    actualizarContador(tiempoSeleccionado);
  });

  llargaBtn.addEventListener("click", function () {
    tiempoSeleccionado = 15;
    actualizarContador(tiempoSeleccionado);
  });

  curtaBtn.addEventListener("click", function () {
    tiempoSeleccionado = 5;
    actualizarContador(tiempoSeleccionado);
  });

  playPauseBtn.addEventListener("click", function () {
    var horaActual = new Date().toLocaleTimeString();
    console.log("La hora actual es: " + horaActual);
  });

  function iniciarTemporizador(tiempo) {
    // Transformar tiempo (contador) en segundos
    let tiempoTotal = tiempo * 60;

    // Obtener la hora local
    let horaActual = new Date().toLocaleTimeString();
    console.log("La hora actual es: " + horaActual);
  }

  ////////////////////////////////////////
  //CREAR TAREAS//////////////////////////
  ////////////////////////////////////////

  // Función para crear una nueva tarjeta de tarea
  // Función para crear una nueva tarjeta de tarea
  function crearTarjeta(titulo, descripcion, categoria, color) {
    // Crea los elementos de la tarjeta
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("draggable", "true"); // Agrega la propiedad draggable

    if (color) {
      card.style.backgroundColor = color;
    }
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h4");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = titulo;
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = descripcion;
    const cardCategory = document.createElement("p");
    cardCategory.classList.add("card-category");
    cardCategory.textContent = categoria;
    cardCategory.textContent = "Categoria: " + categoria;

    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date().toLocaleString();

    const cardDate = document.createElement("p");
    cardDate.classList.add("card-date");

    cardDate.textContent = "Fecha y hora: " + fechaHoraActual;

    // Agrega los elementos a la tarjeta
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardCategory);
    cardBody.appendChild(cardDate);
    card.appendChild(cardBody);

    // Agrega la tarjeta a la columna "PENDENT"
    pendentColumn.appendChild(card);
  }

  // Agrega un evento de clic al botón
  newTaskBtn.addEventListener("click", function () {
    // Muestra el pop-up de Sweet Alert
    Swal.fire({
      title: "Nueva Tarea",
      html:
        '<input id="titulo" class="swal2-input" placeholder="Título">' +
        '<textarea id="descripcion" class="swal2-input" placeholder="Descripción"></textarea>' +
        '<select id="categoria" class="swal2-select">' +
        '<option value="" disabled selected>Selecciona una categoría</option>' +
        '<option value="Diseño" data-color="#F1948A">Diseño</option>' +
        '<option value="Front-end" data-color="#C39BD3">Front-end</option>' +
        '<option value="Back-end" data-color="#85C1E9">Back-end</option>' +
        "</select>",
      focusConfirm: false,
      preConfirm: () => {
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const categoria = document.getElementById("categoria").value;
        const color =
          document.getElementById("categoria").options[
            document.getElementById("categoria").selectedIndex
          ].dataset.color;

        // Verifica si se ha ingresado un título
        if (!titulo) {
          Swal.showValidationMessage("El título es obligatorio");
        }

        // Retorna los datos ingresados para mostrarlos en la alerta final
        return { titulo, descripcion, categoria, color };
      },
    }).then((result) => {
      // Muestra un mensaje con los datos ingresados
      if (result.isConfirmed) {
        // Crea la tarjeta con los datos ingresados y la agrega a la columna "PENDENT"
        crearTarjeta(
          result.value.titulo,
          result.value.descripcion,
          result.value.categoria,
          result.value.color
        );

        Swal.fire({
          icon: "success",
          title: "¡Tarea creada!",
          html:
            `Título: ${result.value.titulo}<br>` +
            `Descripción: ${result.value.descripcion}<br>` +
            `Categoría: ${
              result.value.categoria
                ? result.value.categoria
                : "No especificada"
            }`,
          confirmButtonText: "OK",
        });
      }
    });
  });

  ////////////////////////////////////////
  //DRAG AND DROP/////////////////////////
  ////////////////////////////////////////

  // Selecciona todas las tarjetas de tarea
  const cards = document.querySelectorAll(".card");

  // Agrega eventos de arrastre a cada tarjeta
  cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
  });

  // Función que se ejecuta cuando se inicia el arrastre de una tarjeta
  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  // Agrega eventos de soltar a las columnas
  const columnas = document.querySelectorAll(".cuerpoColumna");
  columnas.forEach((columna) => {
    columna.addEventListener("dragover", dragOver);
    columna.addEventListener("drop", drop);
  });

  // Función que se ejecuta cuando una tarjeta se arrastra sobre una columna
  function dragOver(e) {
    e.preventDefault();
  }

  // Función que se ejecuta cuando se suelta una tarjeta en una columna
  function drop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(cardId);
    const columna = e.target.closest(".cuerpoColumna");
    // Verifica si la columna es la de "COMPLETADA"
    if (columna.classList.contains("columna3")) {
      // Si la columna es "COMPLETADA", no hagas nada
      return;
    }
    // Mueve la tarjeta a la columna
    columna.appendChild(card);
  }
});