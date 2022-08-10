let contenedorGaleria = document.getElementById("galeria-img")

fetch("./galeria.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach(galeria => {
            let div = document.createElement("div")
            div.classList.add("galeria")
            div.innerHTML = `
            <img src= ${galeria.img} alt= "">       
            
            `

            contenedorGaleria.appendChild(div)
        });
    })
