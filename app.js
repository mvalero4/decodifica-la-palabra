//Estructura que manteiene las palabras del juego
let bd = new Array();
bd[0] = ['PERA', 'BANANA', 'NARANJA', 'MELON', 'SANDIA','MANDARINA', 'KIWI', 'FRESA', 'MARACUYA'];
bd[1] = ['PIANO', 'GUITARRA', 'VIOLIN', 'BAJO', 'TROMPETA', 'SAXOFON', 'BATERIA', 'VIOLONCHELO', 'CLARINETE'];
bd[2] = ['LEON', 'GALLINA', 'PERRO', 'LEOPARDO', 'MURCIELAGO', 'MONO', 'ELEFANTE', 'NUTRIA', 'TIGRE'];
bd[3] = ['ARGENTINA', 'PERU', 'CHILE', 'COLOMBIA', 'ESPAÑA', 'MEXICO', 'ECUADOR', 'ALEMANIA', 'FRANCIA'];
bd[4] = ['FUTBOL', 'BALONCESTO', 'BOXEO', 'NATACION', 'TENIS', 'GOLF', 'CICLISMO', 'PATINAJE', 'CROSSFIT', 'RUNNING', 'BALLET'];
bd[5] = ['MARIA', 'PEDRO', 'MANUEL', 'MAURICIO', 'CARLOS', 'JULIAN', 'CARMEN', 'JOSE', 'ANTONIO', 'ALBERTO', 'RAFAEL'];
bd[6] = ['ROJO', 'VERDE', 'AMARILLO', 'AZUL', 'NEGRO', 'BLANCO', 'MORADO', 'GRIS', 'ROSA', 'NARANJA', 'MARRON'];
//categorías
let categorias = ['FRUTAS', 'MUSICA', 'ANIMALES', 'PAISES', 'DEPORTES', 'NOMBRES', 'COLORES'];
//cantidad de palabras con las que se jugará cada categiría
const cantidadPalabras = 5;
//este arreglo guardará las 5 palabras en cada categoría
let palabras = [];
//este arreglo guardá las las palabras desordenadas
let desordenadas = [];
//mantiene el nivel actual
let pos = 0;

//tomo una cagegoría y selección 5 palabras random para jugar
function agregarPalabras(categoria){
    for(i=0;i<cantidadPalabras;i++){
        let x = Math.floor(Math.random() * categoria.length);
        palabras.push(categoria[x]);
        categoria.splice(x,1);
    }   
}
agregarPalabras(bd[pos]);

//Función para desordenar las palabras - quedan guardadas en :desordendadas
function desordenarPalabras(){
    for(var i=0;i<palabras.length;i++){
        //convertimos el pais en un arreglo
        let palabra = palabras[i];
        palabra = palabra.split('');
        
        let palabraDesordenada;
        
        //desordenamos el areglo
        palabraDesordenada = palabra.sort(function(){return Math.random() - 0.5});
        
        //Convertimos el arreglo a string (nos quedara una letra y una coma)
        palabraDesordenada = palabraDesordenada.toString();
        //quitamos las comas
        palabraDesordenada = palabraDesordenada.replace(/,/g,"");
    
        //controlamos que la palabra desordenada no haya quedado igual que la ordenada
        if(palabraDesordenada == palabras[i]){
            i = i - 1;
        }else{
            //Guardamos el pais en el arreglo de paises desordenads
            desordenadas.push(palabraDesordenada);
        }
    }
}

//Función para agregar las palabra y el input 
function agregarPalabra(){
    //agregamos título
    let h2 = document.createElement("h2");
    h2.textContent = categorias[pos];
    document.querySelector("#container").appendChild(h2);
    for(var i = 0; i < desordenadas.length;i++){
        let div = document.createElement("div");
        div.className = "fila";
        let palabra = document.createElement("div")
        palabra.textContent = desordenadas[i];
        palabra.className = "palabra";
        div.appendChild(palabra);
        let input = document.createElement("input");
        input.type = "text";
        input.style.textTransform = 'uppercase';
        input.id = i;
        //al input le agrego el evento onkeyup para detectar cuando se presiono una tecla
        //y llamo a la función corregir
        input.setAttribute("onkeyup", "corregir("+i+")");
        div.appendChild(input);
        document.querySelector("#container").appendChild(div);
    }
}

desordenarPalabras();
agregarPalabra();
efectoNivel();

//función
function corregir(i){
    p = document.getElementById(i).value.toUpperCase();
    if(p==""){
        return;
    }
    if(p==palabras[i]){
        document.getElementById(i).className = "correcta";
        controlarFin();
    }else{
        document.getElementById(i).className = "";
    }
}

let btnCraeado = false;
function controlarFin(){
    let total = document.getElementsByClassName("correcta").length;
    if(total==cantidadPalabras && btnCraeado==false){
        let button = document.createElement("button");
        button.textContent = "Siguiente";
        button.setAttribute("onclick", "siguiente()");
        document.querySelector("#container").appendChild(button);
        btnCraeado=true;
        
        //desbloqueamos el nivel
        let niveles = document.getElementsByClassName("nivel");
        niveles[pos].classList = "nivel completado";
    }
}

function siguiente(){
    const modal = document.querySelector('.modal');
    palabras.length = 0;
    desordenadas.length = 0;
    document.querySelector("#container").textContent = "";
    pos++;
    //controlo si terminó el juego
    if(pos<bd.length){
        btnCraeado = false;
        agregarPalabras(bd[pos]);
        desordenarPalabras();
        efectoNivel();
        agregarPalabra();
    }else{
        let h2 = document.createElement("h2");
        h2.textContent = "JUEGO FINALIZADO!! MUY BIEN!!";
        document.querySelector("#container").appendChild(h2);
        modal.classList.remove('invisible');
        setTimeout(() => {
            location.reload();
        }, 3000);
    }

}

//agrego el borde con efecto al nivel actual
function efectoNivel(){
    let niveles = document.getElementsByClassName("nivel");
    niveles[pos].style.boxShadow = "0px 0px 7px 5px green";
}