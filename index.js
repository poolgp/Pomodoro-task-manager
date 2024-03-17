// Obtiene la referencia al elemento del contador
var contador = document.getElementById('contador');

// Obtiene la referencia al botón de play/pausa
var playPause = document.getElementById('playPause');

// Inicializa las variables para el temporizador
var tiempoInicial;
var tiempoRestante;
var intervalo;

// Agrega un event listener al botón de play/pausa
playPause.addEventListener('click', function() {
  // Obtiene el tiempo seleccionado en el temporizador
  var tiempoSeleccionado = obtenerTiempoSeleccionado();

  // Inicializa el temporizador
  if (!tiempoInicial) {
    // Obtiene el tiempo actual del sistema
    tiempoInicial = Date.now();

    // Calcula el tiempo restante
    tiempoRestante = tiempoSeleccionado * 60 * 1000;

    // Inicia el intervalo de actualización del contador
    intervalo = setInterval(function() {
      actualizarContador(tiempoRestante);
    }, 100);
  } else {
    // Detiene el intervalo de actualización del contador
    clearInterval(intervalo);

    // Reinicia el temporizador
    tiempoInicial = null;
    contador.textContent = 'countdown';
  }
});

// Función para obtener el tiempo seleccionado en el temporizador
function obtenerTiempoSeleccionado() {
  // Obtiene las referencias a los botones de los tempor