



// const contador = document.querySelector(".tiempo");
// let tiempoSeleccionado = 25 * 60; // Convertir minutos a segundos
// let tiempoRestante = tiempoSeleccionado; // Inicializar el tiempo restante

// function actualizarContador(tiempo) {
//   const minutos = Math.floor(tiempo / 60);
//   const segundos = tiempo % 60;
//   const minutosMostrados = minutos < 10 ? "0" + minutos : minutos;
//   const segundosMostrados = segundos < 10 ? "0" + segundos : segundos;
//   contador.textContent = `${minutosMostrados}:${segundosMostrados}`;
// }

// const estudiarBtn = document.querySelector(".estudiar");
// estudiarBtn.addEventListener("click", function () {
//   tiempoSeleccionado = 25 * 60;
//   tiempoRestante = tiempoSeleccionado; // Reiniciar el tiempo restante
//   actualizarContador(tiempoSeleccionado);
// });

// const llargaBtn = document.querySelector(".llarga");
// llargaBtn.addEventListener("click", function () {
//   tiempoSeleccionado = 15 * 60;
//   tiempoRestante = tiempoSeleccionado; // Reiniciar el tiempo restante
//   actualizarContador(tiempoSeleccionado);
// });

// const curtaBtn = document.querySelector(".curta");
// curtaBtn.addEventListener("click", function () {
//   tiempoSeleccionado = 5 * 60;
//   tiempoRestante = tiempoSeleccionado; // Reiniciar el tiempo restante
//   actualizarContador(tiempoSeleccionado);
// });

// let temporizador;

// const playPauseBtn = document.querySelector(".playPause");
// playPauseBtn.addEventListener("click", function () {
//   if (!temporizador) {
//     iniciarTemporizador();
//   } else {
//     pausarTemporizador();
//   }
// });

// function iniciarTemporizador() {
//   temporizador = setInterval(function () {
//     if (tiempoRestante <= 0) {
//       clearInterval(temporizador);
//       alert("¡Tiempo completado!");
//     } else {
//       tiempoRestante--;
//       actualizarContador(tiempoRestante);
//     }
//   }, 1000);
// }

// function pausarTemporizador() {
//   clearInterval(temporizador);
// }

// const reiniciarBtn = document.querySelector(".reiniciar");
// reiniciarBtn.addEventListener("click", function () {
//   tiempoRestante = tiempoSeleccionado;
//   actualizarContador(tiempoRestante);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const newTaskBtn = document.querySelector(".newTask");

//   // Selecciono la columna donde quiero que se cree la tarea
//   const pendentColumn = document.querySelector(".columna1 .cuerpoColumna");

//   ////////////////////////////////////////
//   //CREAR TAREAS//////////////////////////
//   ////////////////////////////////////////

//   // Función para crear una nueva tarjeta de tarea
//   // Función para crear una nueva tarjeta de tarea
//   function crearTarjeta(titulo, descripcion, categoria, color) {
//     // Crea los elementos de la tarjeta
//     const card = document.createElement("div");
//     card.classList.add("card");
//     card.style.margin = "10px";
//     // card.setAttribute("draggable", "true"); // Agrega la propiedad draggable

//     if (color) {
//       card.style.backgroundColor = color;
//     }
//     const cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");
//     const cardTitle = document.createElement("h4");
//     cardTitle.classList.add("card-title");
//     cardTitle.textContent = titulo;
//     const cardText = document.createElement("p");
//     cardText.classList.add("card-text");
//     cardText.textContent = descripcion;
//     const cardCategory = document.createElement("p");
//     cardCategory.classList.add("card-category");
//     cardCategory.textContent = categoria;
//     cardCategory.textContent = "Categoria: " + categoria;

//     // Obtener la fecha y hora actual
//     const fechaHoraActual = new Date().toLocaleString();

//     const cardDate = document.createElement("p");
//     cardDate.classList.add("card-date");

//     cardDate.textContent = "Fecha y hora: " + fechaHoraActual;

//     // Agrega los elementos a la tarjeta
//     cardBody.appendChild(cardTitle);
//     cardBody.appendChild(cardText);
//     cardBody.appendChild(cardCategory);
//     cardBody.appendChild(cardDate);
//     card.appendChild(cardBody);

//     // Agrega la tarjeta a la columna "PENDENT"
//     pendentColumn.appendChild(card);
//   }

//   // Agrega un evento de clic al botón
//   newTaskBtn.addEventListener("click", function () {
//     // Muestra el pop-up de Sweet Alert
//     Swal.fire({
//       title: "Nueva Tarea",
//       html:
//         '<input id="titulo" class="swal2-input" placeholder="Título">' +
//         '<textarea id="descripcion" class="swal2-input" placeholder="Descripción"></textarea>' +
//         '<select id="categoria" class="swal2-select">' +
//         '<option value="" disabled selected>Selecciona una categoría</option>' +
//         '<option value="Diseño" data-color="#F1948A">Diseño</option>' +
//         '<option value="Front-end" data-color="#C39BD3">Front-end</option>' +
//         '<option value="Back-end" data-color="#85C1E9">Back-end</option>' +
//         "</select>",
//       focusConfirm: false,
//       preConfirm: () => {
//         const titulo = document.getElementById("titulo").value;
//         const descripcion = document.getElementById("descripcion").value;
//         const categoria = document.getElementById("categoria").value;
//         const color =
//           document.getElementById("categoria").options[
//             document.getElementById("categoria").selectedIndex
//           ].dataset.color;

//         // Verifica si se ha ingresado un título
//         if (!titulo) {
//           Swal.showValidationMessage("El título es obligatorio");
//         }

//         // Retorna los datos ingresados para mostrarlos en la alerta final
//         return { titulo, descripcion, categoria, color };
//       },
//     }).then((result) => {
//       // Muestra un mensaje con los datos ingresados
//       if (result.isConfirmed) {
//         // Crea la tarjeta con los datos ingresados y la agrega a la columna "PENDENT"
//         crearTarjeta(
//           result.value.titulo,
//           result.value.descripcion,
//           result.value.categoria,
//           result.value.color
//         );

//         Swal.fire({
//           icon: "success",
//           title: "¡Tarea creada!",
//           html:
//             `Título: ${result.value.titulo}<br>` +
//             `Descripción: ${result.value.descripcion}<br>` +
//             `Categoría: ${
//               result.value.categoria
//                 ? result.value.categoria
//                 : "No especificada"
//             }`,
//           confirmButtonText: "OK",
//         });
//       }
//     });
//   });

//   ////////////////////////////////////////
//   //DRAG AND DROP/////////////////////////
//   ////////////////////////////////////////
// });
