
let botonClick = document.querySelectorAll(".boton-carrito")
const tbody = document.querySelector(".tbody")
let carrito = []


botonClick.forEach(btn => {
    btn.addEventListener("click", agregarAlCarrito)
})

function agregarAlCarrito(e){
    let button = e.target
    let item = button.closest(".card")
    let itemNombre = item.querySelector(".card-text").textContent;    
    let itemPrecio = item.querySelector(".precio").textContent;
    let itemImg = item.querySelector(".card-img-top").src;

    let nuevoItem = {
        title: itemNombre,
        precio: itemPrecio,
        img: itemImg,
        cantidad: 1
    }
    
    agregarItemCarrito(nuevoItem)

}

function agregarItemCarrito(nuevoItem){
    

    
    const alert = document.querySelector(".alert")

    setTimeout( function(){
        alert.classList.add("hide")
    }, 1000)
    alert.classList.remove("hide")
    
    const inputElemento = tbody.getElementsByClassName("input")

    for(let i = 0; i < carrito.length ; i++){
        if(carrito[i].title.trim() == nuevoItem.title.trim()){
            carrito[i].cantidad ++;            
            const inputValue = inputElemento[i]
            inputValue.value++;
            carritoTotal()       
            return null;
        }else {
              
        }
    }
    
    carrito.push(nuevoItem)
    localStorage.setItem("Carrito", JSON.stringify(carrito))
    renderCarrito()    
}

function renderCarrito(){

    tbody.innerHTML = ""
    
    carrito.map(item => {
        let div = document.createElement("div")
        div.classList.add("itemCarrito")
        const contenido =`
        <div class="container">
            <div class="row">
                <div class="col">
                    <img src=${item.img}  alt="">
                </div>
                <div class="col">
                    <h3 class="title">${item.title}</h3>
                </div>
                <div class="col">
                    <p> ${item.precio}</p>
                </div>
                <div class="col" id="col-boton">
                    <input type="number" min="1" value=${item.cantidad} class="input">
                    <button class="delete btn btn-danger" id="boton-eliminar">Eliminar</button>
                </div>
            </div>
        </div>
        
           `

        div.innerHTML = contenido;
        tbody.append(div)

        div.querySelector(".delete").addEventListener("click", removeItemCarrito)
        div.querySelector(".input").addEventListener("change", sumaCantidad)

    })
        carritoTotal()
}


function carritoTotal(){
    let total = 0;
    const itemCarritoTotal = document.querySelector(".carritoTotal")
    carrito.forEach((item) =>{
        const precio = Number(item.precio.replace("$", ""))
        total = total + precio*item.cantidad
    })

    itemCarritoTotal.innerHTML = `Total U$S ${total}`

        
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const div = buttonDelete.closest(".itemCarrito")
    const title = div.querySelector(".title").textContent;
    for(let i=0; i<carrito.length ; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
            localStorage.setItem("Carrito", JSON.stringify(carrito))
            
        }
    }

    const alert = document.querySelector(".remove")

    setTimeout(function(){
        alert.classList.add("remove")
    }, 500)
        alert.classList.remove("remove")

    div.remove()
    carritoTotal()

}

function sumaCantidad(e){
    const sumaInput = e.target
    const div = sumaInput.closest(".itemCarrito")
    const title = div.querySelector(".title").textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }
    })
    console.log(carrito)
}

