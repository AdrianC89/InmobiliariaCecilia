const contenedor = document.querySelector(".contenedor")
const PropContainer = document.querySelector(".contenido-prop")
let propCard = document.querySelectorAll(".prop-card")
let descripcion = document.querySelector(".descripcion-prop")
let h2Descripcion = document.createElement('h2')
descripcion.appendChild(h2Descripcion)
let next = document.getElementById("next")
let back = document.getElementById("back")
let inicio = 0
let fin = 5
let propiedades = Array.from(propCard)
console.log(propiedades)
let N = propiedades.length
h2Descripcion.innerHTML = `${N} resultados de propiedades`

function ShowListas(nodos) {
    nodos.forEach(nodo =>{
        nodo.style.display = "block"
    })
}

if(N == 0){
    h2Descripcion.innerHTML = `No se encontraron resultados`
}
if(N > 5){
    let nodos = propiedades.slice(inicio,fin) 
    ShowListas(nodos)
    next.style.visibility = "visible"
    }else{
     ShowListas(propiedades)
     next.style.visibility = "hidden"
    }

    function CleanContainer(){
         propiedades.forEach(propiedad =>{
             propiedad.style.display = "none"
            })
     }
     function scrollToTop() {
        if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
            document.body.scrollTop = 0; // Para navegadores que no son Firefox
            document.documentElement.scrollTop = 0; // Para Firefox
        }
    }
                  
    next.addEventListener("click", ()=>{
    back.style.visibility = "visible"
     if(inicio<(N-3)){
        inicio = inicio + 5
        if((N-inicio)>= inicio){
            fin = inicio + 5
            let nodos = propiedades.slice(inicio, fin)
            CleanContainer()
            ShowListas(nodos)
            scrollToTop()
            console.log("inicio: ",inicio);
            console.log("fin: ",fin);
            }else{
            let nodos = propiedades.slice(inicio, N)
            CleanContainer()
            ShowListas(nodos)
            scrollToTop()
            console.log("inicio: ",inicio);
            console.log("fin: ",fin);
             }
          }
    })
           
    back.addEventListener("click", ()=>{
        if(inicio > 0){
        inicio = inicio - 5
        fin = inicio + 5
        let nodos = propiedades.slice(inicio, fin)
        CleanContainer()
        ShowListas(nodos)
        scrollToTop()
        console.log("inicio: ",inicio);
        console.log("fin: ",fin);
        }
                    
    })