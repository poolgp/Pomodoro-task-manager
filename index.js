document.addEventListener("DOMContentLoaded", function () {
  // Tiempo inicial en minutos
  let tiempoSeleccionado = 25;

  const contador = document.querySelector(".tiempo");
  const estudiarBtn = document.querySelector(".estudiar");
  const llargaBtn = document.querySelector(".llarga");
  const curtaBtn = document.querySelector(".curta");
  const playPauseBtn = document.querySelector(".playPause");

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
    var horaActual = new Date().toLocaleTimeString();
    console.log("La hora actual es: " + horaActual);
  }
});

// // Función para iniciar el temporizador con un tiempo dado
// function iniciarTemporizador(tiempo) {
//   const tiempoTotal = tiempo * 60; // Convertir minutos a segundos

//   const inicio = new Date().getTime(); // Obtener la hora de inicio en milisegundos

//   interval = setInterval(() => {
//     const ahora = new Date().getTime(); // Obtener la hora actual en milisegundos
//     const transcurrido = Math.floor((ahora - inicio) / 1000); // Calcular el tiempo transcurrido en segundos
//     const restante = tiempoTotal - transcurrido; // Calcular el tiempo restante en segundos

//     if (restante <= 0) {
//       clearInterval(interval);
//       // Aquí puedes agregar la lógica para notificar al usuario cuando el tiempo se acaba
//       alert("¡Tiempo terminado!");
//     } else {
//       const minutos = Math.floor(restante / 60);
//       const segundos = restante % 60;

//       contador.textContent = `${minutos}:${
//         segundos < 10 ? "0" : ""
//       }${segundos}`;
//     }
//   }, 1000);
// }
