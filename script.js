 // Lista de productos en la tienda
 const tienda = [
    { id: 'producto1', nombre: 'LTD EC-401', precio: 12000, cantidad: 1 },
    { id: 'producto2', nombre: 'PRS MIRA CORE', precio: 25000, cantidad: 1 },
    { id: 'producto3', nombre: 'LTD EC-1000', precio: 15000, cantidad: 1 },
    { id: 'producto4', nombre: 'Gibson SG', precio: 20000, cantidad: 1 },
];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Creamos un nuevo objeto para el producto
    const nuevoProducto = { nombre: nombre, precio: precio.toFixed(2) };
    // Obtenemos el carrito del localStorage
    let carrito = obtenerCarritoDelLocalStorage();
    // Agregamos el nuevo producto al carrito
    carrito.push(nuevoProducto);
    // Guardamos el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Creamos un nuevo elemento para el producto en el carrito en la página
    const nuevoProductoHTML = document.createElement('p');
    nuevoProductoHTML.textContent = `${nombre} - $${precio.toFixed(2)}`;
    nuevoProductoHTML.classList.add('producto-en-carrito');
    document.getElementById('carrito').appendChild(nuevoProductoHTML);
    // Actualizamos el total
    actualizarTotal();
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    let total = 0;
    // Recorremos todos los elementos del carrito y sumamos los precios
    const productosEnCarrito = document.querySelectorAll('.producto-en-carrito');
    productosEnCarrito.forEach(producto => {
        // Extraemos el precio del texto del elemento y lo convertimos a un número
        const precioTexto = producto.textContent.split(' - ')[1].substring(1);
        const precio = parseFloat(precioTexto);
        total += precio;
    });
    // Actualizamos el texto del total en la página
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

// Función para obtener el carrito del localStorage
function obtenerCarritoDelLocalStorage() {
    let carrito;
    // Verificamos si ya hay un carrito en el localStorage
    if (localStorage.getItem('carrito') === null) {
        // Si no hay un carrito, creamos uno vacío
        carrito = [];
    } else {
        // Si hay un carrito, lo obtenemos del localStorage y lo convertimos a un objeto JavaScript
        carrito = JSON.parse(localStorage.getItem('carrito'));
    }
    return carrito;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    // Eliminamos todos los elementos del carrito en la página
    const carritoEnPagina = document.getElementById('carrito');
    while (carritoEnPagina.firstChild) {
        carritoEnPagina.removeChild(carritoEnPagina.firstChild);
    }
    // Eliminamos el carrito del localStorage
    localStorage.removeItem('carrito');
    // Actualizamos el total
    actualizarTotal();
}

// Función para cargar los productos del carrito almacenados en el localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
    const carrito = obtenerCarritoDelLocalStorage();
    // Recorremos los productos del carrito y los agregamos a la página
    carrito.forEach(producto => {
        agregarAlCarrito(producto.nombre, parseFloat(producto.precio));
    });
}

// Cargamos los productos del carrito almacenados en el localStorage al cargar la página
cargarCarritoDesdeLocalStorage();
