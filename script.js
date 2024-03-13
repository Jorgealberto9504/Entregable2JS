// Lista de productos en la tienda
const tienda = [
    { id: 'producto1', nombre: 'Paracetamol', precio: 20, cantidad: 10 },
    { id: 'producto2', nombre: 'Omeprazol', precio: 85, cantidad: 10 },
    { id: 'producto3', nombre: 'Amantadina', precio: 50, cantidad: 10 },
    { id: 'producto4', nombre: 'Metformina', precio: 30, cantidad: 10 },
    { id: 'producto5', nombre: 'Losartan', precio: 30, cantidad: 10 },
    { id: 'producto6', nombre: 'Amlodipino', precio: 35, cantidad: 10 },
    { id: 'producto7', nombre: 'Loperamida', precio: 15, cantidad: 10 },
    { id: 'producto8', nombre: 'Clorfenamina', precio: 30, cantidad: 10 },
    { id: 'producto9', nombre: 'Captopril', precio: 25, cantidad: 10 },
    // Agrega más productos según sea necesario
];

// Variables globales
let carrito = [];

// Función para agregar un producto al carrito
const agregarAlCarrito = (id) => {
    // Buscar el producto en la tienda por su ID
    const productoEnTienda = tienda.find(producto => producto.id === id);

    // Verificar si hay suficiente stock
    if (productoEnTienda && productoEnTienda.cantidad > 0) {
        // Reducir la cantidad en la tienda
        productoEnTienda.cantidad--;

        // Crear un objeto producto para el carrito
        const productoCarrito = {
            id: productoEnTienda.id,
            nombre: productoEnTienda.nombre,
            precio: productoEnTienda.precio
        };

        // Agregar el producto al carrito
        carrito.push(productoCarrito);

        // Actualizar la interfaz
        renderizarProductos();
        renderizarCarrito();
        actualizarLocalStorage();
    } else {
        alert('¡Producto agotado!');
    }
};

// Función para renderizar los productos en la tienda
const renderizarProductos = () => {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    // Dividir la lista de productos en grupos de 3 elementos
    for (let i = 0; i < tienda.length; i += 3) {
        // Crear una fila para la cuadrícula
        const fila = document.createElement('div');
        fila.className = 'fila';

        // Agregar los productos a la fila
        for (let j = i; j < i + 3 && j < tienda.length; j++) {
            const producto = tienda[j];
            const p = document.createElement('p');
            p.innerHTML = `${producto.nombre} - $${producto.precio} <button class="comprar" data-id="${producto.id}">Comprar</button>`;
            fila.appendChild(p);
        }

        // Agregar la fila al contenedor de productos
        listaProductos.appendChild(fila);
    }
};


// Función para renderizar el carrito de compras
const renderizarCarrito = () => {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalElemento = document.getElementById('total');

    // Limpiar la lista antes de renderizar
    listaCarrito.innerHTML = '';

    // Filtrar productos si hay un término de búsqueda
    const terminoBusqueda = document.getElementById('buscar').value.toLowerCase();
    const productosFiltrados = carrito.filter(producto => producto.nombre.toLowerCase().includes(terminoBusqueda));

    // Mostrar el carrito solo si hay elementos en él
    if (productosFiltrados.length > 0) {
        // Renderizar cada producto en el carrito
        productosFiltrados.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `Producto ${producto.nombre} - $${producto.precio}`;
            listaCarrito.appendChild(li);
        }); 

        // Calcular y mostrar el total
        const total = productosFiltrados.reduce((sum, producto) => sum + producto.precio, 0);
        totalElemento.textContent = total;
    } else {
        // Mostrar un mensaje indicando que el carrito está vacío
        const li = document.createElement('li');
        li.textContent = 'El carrito está vacío';
        listaCarrito.appendChild(li);

        // Limpiar el total
        totalElemento.textContent = '';
    }
};

// Función para vaciar el carrito
const vaciarCarrito = () => {
    carrito = [];
    renderizarCarrito();
    actualizarLocalStorage();
};

// Función para realizar la compra
const realizarCompra = () => {
    alert('Compra realizada. Gracias por su compra.');
    vaciarCarrito();
};

// Función para actualizar el local storage
const actualizarLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Cargar carrito desde el local storage al cargar la página
carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Evento para agregar un producto al carrito
document.getElementById('listaProductos').addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    if (id) {
        agregarAlCarrito(id);
    }
});

// Evento para vaciar el carrito
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    vaciarCarrito();
});

// Evento para realizar la compra
document.getElementById('realizarCompra').addEventListener('click', () => {
    realizarCompra();
});

// Evento para buscar productos al escribir en el campo de búsqueda
document.getElementById('buscar').addEventListener('input', () => {
    renderizarCarrito();
});

// Llamar a renderizarProductos y renderizarCarrito al cargar la página
window.onload = () => {
    renderizarProductos();
    renderizarCarrito();
};