function abrir(){
  document.getElementById("panel").style.display="block";

  // reproducir audio al tocar (compatible con móviles)
  let audio = document.getElementById("audio");
  audio.play().catch(()=>{});

  iniciarCarrusel();
}

/* GLOBOS ANIMADOS */
function animacion(){
  setInterval(()=>{
    let item=document.createElement("div");
    item.className="item";

    let elementos=["🎈","⭐","✨"];
    item.innerHTML=elementos[Math.floor(Math.random()*elementos.length)];

    item.style.left=Math.random()*100+"vw";
    item.style.fontSize=(Math.random()*20+15)+"px";

    document.body.appendChild(item);

    setTimeout(()=>item.remove(),6000);
  },150);
}

/* CARRUSEL INFINITO */
let intervalo;

function iniciarCarrusel(){
  let carrusel=document.getElementById("carrusel");

  if(!carrusel.dataset.loop){
    carrusel.innerHTML += carrusel.innerHTML;
    carrusel.dataset.loop = "true";
  }

  intervalo=setInterval(()=>{
    carrusel.scrollLeft += 1;

    if(carrusel.scrollLeft >= carrusel.scrollWidth / 2){
      carrusel.scrollLeft = 0;
    }
  },20);

  // parar al arrastrar o tocar
  carrusel.addEventListener("mousedown", ()=>clearInterval(intervalo));
  carrusel.addEventListener("mouseup", iniciarCarrusel);

  carrusel.addEventListener("touchstart", ()=>clearInterval(intervalo));
  carrusel.addEventListener("touchend", iniciarCarrusel);

  // abrir modal al tocar imagen
  let imgs=carrusel.querySelectorAll("img");

  imgs.forEach(img=>{
    img.onclick=()=>{
      clearInterval(intervalo);
      document.getElementById("modal").style.display="flex";
      document.getElementById("imgGrande").src=img.src;
    }
  });
}

/* CERRAR MODAL */
function cerrarImagen(){
  document.getElementById("modal").style.display="none";
  iniciarCarrusel();
}

/* INICIO GLOBOS */
animacion();