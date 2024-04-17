const contenedor = document.querySelector(".contenedor")
const PropContainer = document.querySelector(".contenido-prop")
let propCard = document.querySelectorAll(".prop-card")
let descripcion = document.querySelector(".descripcion-prop")
let h2Descripcion = document.createElement('h2')
descripcion.appendChild(h2Descripcion)
let buttonSection = document.getElementById("button-section")
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
    alert("No hay propiedades disponibles")
}
if(N > 5){
    let nodos = propiedades.slice(inicio,fin) 
    ShowListas(nodos)
    next.style.display = "block"
    }else{
     ShowListas(propiedades)
     next.style.display = "none"
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
    back.style.display = "block"
    buttonSection.style.justifyContent = "space-between"
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
        if(inicio == 0){
         back.style.display = "none"
         buttonSection.style.justifyContent = "center"
        }
        }
                    
    })