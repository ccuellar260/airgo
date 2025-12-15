document.addEventListener('DOMContentLoaded', function () {
  // Origen
  console.log('saludos desde vuelo 2.0 .js');

  //llamar al campo campo_origen
  const campoOrigen = document.getElementById('campo_origen');
  const modalOrigen = document.getElementById('modal_origen');
  const inputOrigen = document.getElementById('input_origen');


  //obtener evento click 
  campoOrigen.addEventListener('click', function (e) {
    modalOrigen.style.display = modalOrigen.style.display === 'block' ? 'none' : 'block';
    e.stopPropagation();
  });

  // Cerrar el modal si se hace clic fuera de él
  document.addEventListener('click', function (e) {
    if (!campoOrigen.contains(e.target)) {
      modalOrigen.style.display = 'none';
    }
  });

    // Al seleccionar un aeropuerto, ponerlo en el input
    const opciones =  document.querySelectorAll('.opcion-origen');
    console.log('opciones: ', opciones);
    
    opciones.forEach(function(item) {
      //al hacer click en algun item del aeropuerto
      console.log('item: ', item);
      

      item.addEventListener('click', function() {
        // Puedes personalizar el texto mostrado, aquí se toma la ciudad y el nombre del aeropuerto
        console.log('click en algun elemento del aeropuerto');
        
        const ciudad = item.querySelector('.opcion-ciudad-pais span').textContent;
        const nombreAeropuerto = item.querySelector('.nombre-aeropuerto').textContent;
        const codigo = item.querySelector('.codigo-aeropuerto').textContent;

        // Mostrar el input y asignar el valor
        inputOrigen.style.display = 'block';
        inputOrigen.value = `${ciudad} (${codigo})`;
        modalOrigen.style.display = 'none';
      });
  });






});