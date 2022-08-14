const baseDeDatos = [
    { id: 1, nombre: "Gorra HI MY NAME IS", precio: 35 , imagen: "./imagenes/gorra1.jpg" },
    { id: 2, nombre: "Gorra SLIM SHADY", precio: 35 , imagen: "./imagenes/Gorra2.jpg" },
    { id: 3, nombre: "Gorra KAMIKAZE", precio: 35 , imagen: "./imagenes/Gorra3.jpg" },
    { id: 4, nombre: "Buzo SLIM SHADY", precio: 50 , imagen: "./imagenes/Buzo1.jpg" },
    { id: 5, nombre: "Buzo HI MY NAME IS", precio: 50 , imagen: "./imagenes/Buzo2.jpg" },
    { id: 6, nombre: "Buzo TILL I COLLAPSE", precio: 50 , imagen: "./imagenes/Buzo3.jpg" },
    { id: 7, nombre: "Buzo THE WAY I AM", precio: 50 , imagen: "./imagenes/Buzo4.jpg" },
    { id: 8, nombre: "Remera DONT DO DRUGS", precio: 30 , imagen: "./imagenes/Remera1.jpg" },
    { id: 9, nombre: "Remera HI MY NAME IS", precio: 30 , imagen: "./imagenes/Remera2.jpg" },
    { id: 10, nombre: "Remera EMINEM LOGO", precio: 30 , imagen: "./imagenes/Remera3.jpg" },
    { id: 11, nombre: "Remera EMINEM", precio: 30 , imagen: "./imagenes/Remera4.jpg" }

];

let carrito = [];
const divisa = 'U$S';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.getElementById('carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
       
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title', 'text-center');
        miNodoTitle.textContent = info.nombre;
       
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
      
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text', 'text-center');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
       
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-danger', 'fs-6');
        miNodoBoton.textContent = 'Agregar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', añadirProductoAlCarrito);
        
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}


function añadirProductoAlCarrito(evento) {  
    carrito.push(evento.target.getAttribute('marcador'))    
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}


function renderizarCarrito() {   
    DOMcarrito.textContent = '';
    
    const carritoSinDuplicados = [...new Set(carrito)];
    
    carritoSinDuplicados.forEach((item) => {
       
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
           
            return itemBaseDatos.id === parseInt(item);
        });
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            
            return itemId === item ? total += 1 : total;
        }, 0);
        
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    
    DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
    
    const id = evento.target.dataset.item;
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    
    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}


function calcularTotal() {
    
    return carrito.reduce((total, item) => {
        
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function vaciarCarrito() {
   
    carrito = [];    
    renderizarCarrito();
    localStorage.clear();
}


function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {    
    if (miLocalStorage.getItem('carrito') !== null) {        
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}



DOMbotonVaciar.addEventListener('click', vaciarCarrito);

cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();



