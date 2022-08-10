
let contenedorTour = document.getElementById("fechas-tour")

fetch("./tour.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach(tour => {
            let div = document.createElement("div")
            div.classList.add("tour")
            div.innerHTML = `
            <p>${tour.fecha} - ${tour.lugar} - <a href="${tour.tickets}" class="pos-tickets"> TICKETS</a> </p>            
            
            `

            contenedorTour.appendChild(div)
        });
    })