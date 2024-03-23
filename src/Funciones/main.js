// Javascript de carrousel de imágenes!!
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; 
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {

    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }

    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false

    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);




//propiedades





const contenedor = document.querySelector(".contenedor")
const PropContainer = document.querySelector(".contenido-prop")
let descripcion = document.querySelector(".descripcion")
let h2Descripcion = document.createElement('h2')
descripcion.appendChild(h2Descripcion)
let next = document.getElementById("next")
let back = document.getElementById("back")
let inicio = 0
let fin = 5





//let N = 
h2Descripcion.innerHTML = `${N} resultados de propiedades`

function CreatePropiedad(propiedades){
propiedades.forEach(propiedad => {
    const divPropiedad = document.createElement('div')
    divPropiedad.classList.add('prop-card')
    for(const clave in propiedad){
      if(propiedad.hasOwnProperty(clave)){
        switch (clave) {
            case "img":
                const img = document.createElement('img')
                img.src = propiedad[clave]
                divPropiedad.appendChild(img)
                break;
            case "descripcion": 
               const divParrafo = document.createElement('div')
               divParrafo.classList.add('prop-descripcion')
               const parrafo = document.createElement('p')
               parrafo.textContent = `${propiedad[clave]}`
               divParrafo.appendChild(parrafo)
               divPropiedad.appendChild(divParrafo)
               break;
            case "titulo":
                const divTitulo = document.createElement('div')
                divTitulo.classList.add('Titulo')
                const titulo = document.createElement('h3')
                titulo.textContent = `${propiedad[clave]}`
                divTitulo.appendChild(titulo)
                divPropiedad.appendChild(divTitulo)
                break;
            case "precio":
                const divPrecio = document.createElement('div')
                divPrecio.classList.add('Precio')
                const precio = document.createElement('h3')
                precio.textContent = `${propiedad[clave]}`
                divPrecio.appendChild(precio)
                divPropiedad.appendChild(divPrecio)
                break;
            default:
                break;
        }
      }
    }
    contenedor.appendChild(divPropiedad)
});
}

if(N == 0){
  alert("No hay propiedades disponibles")
}
if(N > 5){
  let nodos = ArrayPropiedades.slice(inicio,fin) 
  CreatePropiedad(nodos)
  next.style.visibility = "visible"
}else{
CreatePropiedad(ArrayPropiedades)
 next.style.visibility = "hidden"
}

function CleanContainer(container){
  while(container.firstChild){
    container.removeChild(container.firstChild)
  }
}

next.addEventListener("click", ()=>{
  back.style.visibility = "visible"
  if(inicio<(N-5)){
    inicio = inicio + 5
    if((N-inicio)>= inicio){
      fin = inicio + 5
      let nodos = ArrayPropiedades.slice(inicio, fin)
      CleanContainer(contenedor)
      CreatePropiedad(nodos)
      PropContainer.scrollTop = 0
      console.log("inicio: ",inicio);
      console.log("fin: ",fin);
    }else{
      let nodos = ArrayPropiedades.slice(inicio, N)
      CleanContainer(contenedor)
      CreatePropiedad(nodos)
      PropContainer.scrollTop = 0
      console.log("inicio: ",inicio);
      console.log("fin: ",fin);
    }
  }
})

back.addEventListener("click", ()=>{
  if(inicio > 0){
    inicio = inicio - 5
    fin = inicio + 5
    let nodos = ArrayPropiedades.slice(inicio, fin)
    CleanContainer(contenedor)
    CreatePropiedad(nodos)
    PropContainer.scrollTop = 0
    console.log("inicio: ",inicio);
    console.log("fin: ",fin);
  }
  
})