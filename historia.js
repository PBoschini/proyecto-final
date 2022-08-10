let contenedorBiografia = document.getElementById("contenedor-biografia")

fetch("./historia.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach(historia => {
            let div = document.createElement("div")
            div.classList.add("biografia")
            div.innerHTML = `
            <h3>${historia.titulo}</h3>
            <p>${historia.parrafo}</p>
            `

            contenedorBiografia.appendChild(div)
        });
    })