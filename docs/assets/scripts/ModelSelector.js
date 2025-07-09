const modelos = [
    { nombre: "Modelo 1", precio: "S/. 1500", imagen: "assets/images/Lentes.jpeg" },/*0*/
    { nombre: "Modelo 2", precio: "S/. 1500", imagen: "assets/images/Lensfront.png" }/*1*/
  ];

  // Inicio
  let actual = 0;

  
  const imagen = document.getElementById("catalogo-img");
  const textoNombre = document.getElementById("modelo-nombre");
  const textoPrecio = document.getElementById("modelo-precio");
  const campoOculto = document.getElementById("modeloSeleccionado");

  // Función para mostrar el modelo actual en la página
  function mostrarModelo() {
    const modelo = modelos[actual];
    imagen.src = modelo.imagen;
    textoNombre.textContent = modelo.nombre;
    textoPrecio.textContent = modelo.precio;
    campoOculto.value = modelo.nombre;
  }

  // Flecha izquierda
  document.querySelector(".left").onclick = () => {
    actual = (actual - 1 + modelos.length) % modelos.length;
    mostrarModelo();
  };

  // Flecha derecha
  document.querySelector(".right").onclick = () => {
    actual = (actual + 1) % modelos.length;
    mostrarModelo();
  };

  // Mostrar el primer modelo al cargar
  mostrarModelo();