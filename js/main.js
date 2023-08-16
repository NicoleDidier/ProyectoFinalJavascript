document.addEventListener('DOMContentLoaded', function() {
  // Array de productos
  
  const productos = [
    {
        "id": 1,
        "nombre": "Camiseta",
        "precio": 4500,
        "imagen": "./img/remera-cara-feliz.jpg"
    },
    {
        "id": 2, 
        "nombre": "Remera", 
        "precio": 4500, 
        "imagen":"./img/remera-quicksilver.jpeg"
    },
    {
        "id": 3,
        "nombre": "Bandolera",
        "precio": 9000,
        "imagen": "./img/bandolera-nike.jpg"
    },
    {
        "id": 4,
        "nombre": "Remera Volcom",
        "precio": 4500,
        "imagen": "./img/remera-volcom.png"
    },
    {
        "id": 5,
        "nombre": "Bermuda",
        "precio": 8000,
        "imagen": "./img/bermuda-ripcurl.png"
    },
    {
        "id": 6,
        "nombre": "Campera",
        "precio": 48000,
        "imagen": "./img/campera-rusty.jpg"
    }
]

function mostrarProductos() {
  const contenedorProductos = document.getElementById('contenedor-productos');

  productos.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto-card');
    productoDiv.innerHTML = `
      <div class="producto-imagen">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="producto-info">
        <h2>${producto.nombre}</h2>
        <p class="precio">Precio: $${producto.precio}</p>
        <div class="acciones">
          <input type="number" min="1" value="1" class="cantidad-input">
          <button class="agregar-carrito-btn">Agregar al carrito</button>
        </div>
      </div>
    `;
    contenedorProductos.appendChild(productoDiv);
  });

  const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito-btn');
  botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
  });
}

let carrito = [];
//Funcion para pedir email al iniciar

const pedirEmail = async () => {
  const { value: email } = await Swal.fire({
    title: 'Ingresa tu Email',
    input: 'email',
    inputLabel: 'Direccion de correo electronico',
    inputPlaceholder: 'Ingresa aqui tu correo electronico'
  })

  if(email){
    Swal.fire(`Email ingresado: ${email}`)
  }
}
pedirEmail();

// Función para agregar un producto al carrito

function agregarAlCarrito(event) {
  const productoDiv = event.target.closest('.producto-card');
  const nombreProducto = productoDiv.querySelector('h2').textContent;
  const precioProducto = parseFloat(productoDiv.querySelector('.precio').textContent.replace('Precio: $', ''));
  const cantidad = parseInt(productoDiv.querySelector('.cantidad-input').value);

  // Verificar si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(item => item.nombre === nombreProducto);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: cantidad });
  }
  updateCartUI();
  
  Toastify({
    text: "Producto agregado al carrito",
    offset: {
      x: 50, 
      y: 10 
    },
  }).showToast();
}

// Función para eliminar un producto del carrito por su nombre

function eliminarProductoDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  updateCartUI();
  Swal.fire({
    title: 'Estas seguro de eliminar el producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Tu producto ha sido eliminado del carrito.',
        'success'
      )
    }
  })
}

// Función para vaciar todo el carrito

function vaciarCarrito() {
  carrito = [];
  updateCartUI();
}

// Función para finalizar la compra

function finalizarCompra() {
  vaciarCarrito();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tu compra ha sido realizada!',
    text: 'Estaremos en contacto para continuar con el pago',
    showConfirmButton: false,
    timer: 2000
  })
}


// Función para actualizar la interfaz del carrito
function updateCartUI() {
  const carritoContainer = document.getElementById('carrito-container');
  carritoContainer.innerHTML = '';

  carrito.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('carrito-item');
    itemDiv.innerHTML = `
      <p>${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad}</p>
      <button class="vaciar-carrito-btn" data-nombre="${item.nombre}">Eliminar</button>
    `;
    carritoContainer.appendChild(itemDiv);
  });

  const botonesEliminarCarrito = document.querySelectorAll('.vaciar-carrito-btn');
  botonesEliminarCarrito.forEach(boton => {
    boton.addEventListener('click', function(event) {
      const nombre = event.target.getAttribute('data-nombre');
      eliminarProductoDelCarrito(nombre);
    });
  });
}

// Llamada inicial para mostrar los productos y configurar el carrito

mostrarProductos();
updateCartUI();

// Event listener para el botón de finalizar compra

const botonFinalizarCompra = document.getElementById('finalizar-compra-btn');
botonFinalizarCompra.addEventListener('click', finalizarCompra);
mostrarProductos();
   updateCartUI();
 });
 